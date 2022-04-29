import { Connection } from 'mongoose';
import { WorkoutSessionSchema } from "./schemas/workout-session.schema";

export const WorkoutProvider = [
  {
    provide: 'WORKOUT_SESSION_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Workout', WorkoutSessionSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
