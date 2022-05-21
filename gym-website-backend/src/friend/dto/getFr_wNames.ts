import { ApiProperty } from '@nestjs/swagger';

export class GetFr_wNames {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
}
