import { ApiProperty } from '@nestjs/swagger';

export class GetWorkoutSessionDto {
  @ApiProperty({ type: String })
  userId: string;
  @ApiProperty({ type: Date })
  date: Date;
}
