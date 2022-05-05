import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ type: String })
  email: string;
  @ApiProperty({ type: String })
  password: string;
}
