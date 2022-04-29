import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkoutExerciseSetDto {
  @ApiProperty({ type: String })
  workoutExerciseId: string;
  @ApiProperty({ type: Number })
  weight: number;
  @ApiProperty({ type: Number })
  reps: number;
}
