import { Connection } from 'mongoose';
import { ExerciseSchema } from './schemas/exercise.schema';

export const ExerciseProvider = [
  {
    provide: 'EXERCISE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Exercise', ExerciseSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
