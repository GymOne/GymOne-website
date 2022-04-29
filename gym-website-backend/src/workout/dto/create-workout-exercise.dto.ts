import { ApiProperty } from "@nestjs/swagger";

export class CreateWorkoutExerciseDto {
  @ApiProperty({ type: String })
  workoutSessionId: string;
  @ApiProperty({ type: String })
  exerciseId: string;
}
