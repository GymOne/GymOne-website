import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { FriendRequestDto } from './dto/friend-request.dto';
import { Model } from 'mongoose';
import { FriendEntity } from './entities/friend.entity';
import { User } from '../users/entities/user.entity';
import { FriendStatusDto } from './dto/friend-status.dto';
import { promises } from 'dns';
import { response } from 'express';

@Injectable()
export class FriendService {
  constructor(
    @Inject('FRIEND_MODEL') private readonly friendModel: Model<FriendEntity>,
  ) {}

  async submitFriendRequest(
    senderId: string,
    receiverId: string,
    isAccepted: boolean,
  ): Promise<boolean> {
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
      response.receiverEmail,
    );
    if (result && response.isAccepted) {
      await this.friendModel.updateOne(
        { senderId: response.senderId, receiverId: response.receiverEmail },
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
      receiverId: response.receiverEmail,
    });
    return true;
  }
}
