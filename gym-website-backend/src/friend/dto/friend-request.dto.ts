import { ApiProperty } from '@nestjs/swagger';

export class FriendRequestDto {
  @ApiProperty()
  senderId: string;
  @ApiProperty()
  receiverId: string;
  @ApiProperty()
  isAccepted: boolean;
}
