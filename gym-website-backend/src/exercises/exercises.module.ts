import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { ExerciseProvider } from '../infrastructure/mongo/exercise.provider';
import { MongodbModule } from '../infrastructure/mongo/mongodb.module';
import { WorkoutProvider } from '../infrastructure/mongo/workout.provider';

@Module({
  imports: [MongodbModule],
  controllers: [ExercisesController],
  providers: [ExercisesService, ...ExerciseProvider, ...WorkoutProvider],
})
export class ExercisesModule {}
