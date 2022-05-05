import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { FriendRequestDto } from './dto/friend-request.dto';
import { FriendService } from './friend.service';
import { UserService } from '../users/user.service';
import { FriendStatusDto } from './dto/friend-status.dto';

@Controller('friend')
export class FriendController {
  constructor(
    private _friendService: FriendService,
    private _userService: UserService,
  ) {}

  @Post('submitRequest')
  async submitFriendRequest(
    @Body() frRequest: FriendRequestDto,
  ): Promise<boolean> {
    return this._friendService.submitFriendRequest(
      frRequest.senderId,
      frRequest.receiverEmail,
      frRequest.isAccepted,
    );
  }

  @Post('actionOnRequet')
  async respondFriendRequest(
    @Body() frRequest: FriendRequestDto,
  ): Promise<boolean> {
    console.log(frRequest);
    const actionResult = this._friendService.respondFriendRequest(frRequest);
    if (actionResult == null) throw new Error('Action was not successful');
    return true;
  }
}
