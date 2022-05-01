import { ApiProperty } from '@nestjs/swagger';

export class FriendRequestDto {
  @ApiProperty()
  senderId: string;
  @ApiProperty()
  receiverEmail: string;
  @ApiProperty()
  isAccepted: boolean;
}
