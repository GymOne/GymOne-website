import {workoutExercise} from "./workout-exercise.entity";

export interface workoutSession {
  _id: string;
  userId: string;
  date: Date;
  workouts: [workoutExercise];
}
