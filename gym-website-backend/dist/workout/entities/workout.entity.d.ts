import { WorkoutSession } from './workout.session.entity';
export declare class Workout {
    id: string;
    userId: string;
    sessions: [WorkoutSession];
}
