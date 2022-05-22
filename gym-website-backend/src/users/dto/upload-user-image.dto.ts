import { ApiProperty } from '@nestjs/swagger';

export class UploadUserImageDto {
  @ApiProperty({ type: String })
  userId: string;
  @ApiProperty({ type: String })
  userEmail: string;
  imageData: Buffer;
}
