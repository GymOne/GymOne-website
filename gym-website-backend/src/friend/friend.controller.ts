import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { FriendRequestDto } from './dto/friend-request.dto';
import { FriendService } from './friend.service';

@Controller('friend')
export class FriendController {
  constructor() {
    _friendService: FriendService;
  }

  @Post('submitRequest')
  @HttpCode(HttpStatus.OK)
  submitFriendRequest(
    @Body() frRequest: FriendRequestDto,
  ): Promise<FriendRequestDto> {
    return null;
  }
}
