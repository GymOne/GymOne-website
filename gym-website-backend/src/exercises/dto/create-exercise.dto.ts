import { ApiProperty } from '@nestjs/swagger';

export class CreateExerciseDto {
  @ApiProperty({ type: String })
  userId: string;
  @ApiProperty({ type: String })
  name: string;
}
