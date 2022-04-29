import { WorkoutExercise } from './workout.exercise.entity';

export class WorkoutSession {
  id: string;
  userId: string;
  workouts: [WorkoutExercise];
  date: Date;
}
