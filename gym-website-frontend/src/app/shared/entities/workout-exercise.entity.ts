import {workoutSet} from "./workout-set.entity";
import {exercise} from "./exercise.entity";

export interface workoutExercise {
  _id: string;
  exercise: exercise;
  sets: [workoutSet];
}
