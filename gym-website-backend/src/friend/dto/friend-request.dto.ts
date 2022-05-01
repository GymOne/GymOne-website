import { ApiProperty } from '@nestjs/swagger';

export class FriendRequestDto {
  @ApiProperty()
  senderId: number;
  @ApiProperty()
  receiverId: number;
  @ApiProperty()
  isAccepted: boolean;
}
