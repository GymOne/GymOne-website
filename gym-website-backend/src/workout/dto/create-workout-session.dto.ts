import { ApiProperty } from '@nestjs/swagger';
import { WorkoutExercise } from '../entities/workout.exercise.entity';

export class CreateWorkoutSessionDto {
  @ApiProperty({ type: String })
  userId: string;
  @ApiProperty({ type: Date })
  date: Date;
}
