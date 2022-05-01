import {workoutSet} from "./workout-set.entity";

export interface workoutExercise {
  _id: string;
  exerciseId: string;
  sets: [workoutSet];
}
