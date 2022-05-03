import { WorkoutSet } from './workout.set.entity';

export class WorkoutExercise {
  id: string;
  exercise: string;
  sets: [WorkoutSet];
}
