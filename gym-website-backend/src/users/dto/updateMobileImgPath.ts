import { ApiProperty } from "@nestjs/swagger";

export class UpdateMobileImgPath{
  @ApiProperty({ type: String })
  email: string;
  @ApiProperty({ type: String })
  filePath: string;
}