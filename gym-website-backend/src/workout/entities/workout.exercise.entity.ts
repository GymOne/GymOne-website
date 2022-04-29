import { WorkoutSet } from './workout.set.entity';

export class WorkoutExercise {
  id: string;
  exerciseId: string;
  sets: [WorkoutSet];
}
