import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { FriendRequestDto } from './dto/friend-request.dto';
import { Model } from 'mongoose';
import { FriendEntity } from './entities/friend.entity';
import { User } from '../users/entities/user.entity';
import { FriendStatusDto } from './dto/friend-status.dto';
import { promises } from 'dns';
import { response } from 'express';
import any = jasmine.any;
import { UserService } from '../users/user.service';
import { GetFr_wNames } from './dto/getFr_wNames';

@Injectable()
export class FriendService {
  constructor(
    @Inject('FRIEND_MODEL') private readonly friendModel: Model<FriendEntity>,
    private readonly userService: UserService,
  ) {}

  async submitFriendRequest(
    senderId: string,
    receiverId: string,
    isAccepted: boolean,
  ): Promise<boolean> {
    //Check for the existing request from other user
    if (await this.checkOposit(senderId, receiverId)) {
      return false;
    }
    const object = await this.getEntryByEmails(senderId, receiverId);
    if (object) return false;
    const newRequestEntity = await new this.friendModel({
      senderId: senderId,
      receiverId: receiverId,
      isAccepted: false,
    });
    newRequestEntity.save();
    return false;
  }

  async getEntryByEmails(
    senderId: string,
    receiverId: string,
  ): Promise<FriendEntity> {
    return this.friendModel
      .findOne({ senderId: senderId, receiverId: receiverId })
      .exec();
  }
  async respondFriendRequest(response: FriendRequestDto): Promise<boolean> {
    console.log('response obj from swagger     ' + response);
    const result = await this.getEntryByEmails(
      response.senderId,
      response.receiverId,
    );
    if (result && response.isAccepted) {
      await this.friendModel.updateOne(
        { senderId: response.senderId, receiverId: response.receiverId },
        {
          $set: { isAccepted: true },
          $currentDate: { lastModified: true },
        },
      );
      return true;
    }
    if (result && !response.isAccepted) {
      console.log('tried to remove');
      return this.removeRequest(response);
    }
    //console.log('Should get something if all good   ' + result);
    if (!result) return null;
  }

  async removeRequest(response: FriendRequestDto): Promise<boolean> {
    await this.friendModel.deleteOne({
      senderId: response.senderId,
      receiverId: response.receiverId,
    });
    await this.friendModel.deleteOne({
      senderId: response.receiverId,
      receiverId: response.senderId,
    });
    return true;
  }

  private async checkOposit(senderId: string, receiverId: string) {
    [senderId, receiverId] = [receiverId, senderId];
    if ((await this.getEntryByEmails(senderId, receiverId)) == null) {
      return false;
    }
    return true;
  }

  getRequestsByEmail(userEmail: string): Promise<FriendRequestDto[]> {
    //const res = this.friendModel.find({ senderId: userEmail }).exec();
    const res = this.friendModel
      .find({ $or: [{ senderId: userEmail }, { receiverId: userEmail }] })
      .exec();
    return res.then();
  }

  async getFriendsByEmail(userEmail: string): Promise<any> {
    const friends = [];
    const requests = await this.getRequestsByEmail(userEmail);
    console.log(requests);
    for (const request of requests) {
      let friend;
      if (request.isAccepted) {
        if (request.senderId == userEmail) {
          const userObj = await this.userService.findByEmail(
            request.receiverId,
          );
          if (userObj != null) {
            friend = { name: userObj.name, friendEmail: request.receiverId };
          }
        } else {
          const userObj = await this.userService.findByEmail(request.senderId);
          console.log(userObj);
          friend = { name: userObj.name, friendEmail: request.senderId };
        }
        friends.push(friend);
      }
    }
    return friends;
  }

  async getRequestsWithNames(userEmail: string): Promise<GetFr_wNames[]> {
    const friendRequestList: GetFr_wNames[] = [];
    const requests = await this.getRequestsByEmail(userEmail);
    for (const request of requests) {
      let friendRequest: GetFr_wNames;
      if (!request.isAccepted) {
        if (request.receiverId == userEmail) {
          const userObj = await this.userService.findByEmail(request.senderId);
          if (userObj != null) {
            friendRequest = {
              id: userObj.id.toString(),
              name: userObj.name,
              email: request.receiverId,
            };
          }
          friendRequestList.push(friendRequest);
        }
      }
    }
    return friendRequestList;
  }
}
