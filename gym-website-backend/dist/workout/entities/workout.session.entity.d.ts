import { WorkoutExercise } from './workout.exercise.entity';
export declare class WorkoutSession {
    id: string;
    userId: string;
    workouts: [WorkoutExercise];
    date: Date;
}
