import { Inject, Injectable } from '@nestjs/common';
import { FriendRequestDto } from './dto/friend-request.dto';
import { Model } from 'mongoose';
import { Friend } from './entities/friend.entity';

@Injectable()
export class FriendService {
  constructor(
    @Inject('FRIEND_MODEL') private readonly friendModel: Model<Friend>,
  ) {}

  async submitFriendRequest(
    friendRequestDto: FriendRequestDto,
  ): Promise<FriendRequestDto> {
    return null;
  }
}
