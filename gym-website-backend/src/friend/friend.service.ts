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
    const newRequestEntity = await new this.friendModel({
      // senderId: senderId,
      // receiverId: receiverId,
      // isAccepted: false,

      senderId: 'hello',
      receiverId: 'hello',
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
    console.log('response obj     ' + response);
    const result = await this.getEntryByEmails(
      response.senderId,
      response.receiverEmail,
    );
    console.log('got entity from getEntryByEmails' + result);
    if (!result) return null;
    await this.friendModel.updateOne(
      { senderId: 'hello', receiverId: 'hello' },
      {
        $set: { isAccepted: true },
        $currentDate: { lastModified: true },
      },
    );
    return true;
    //this.friendModel.updateOne(result).exec();

    return true;
  }
}
