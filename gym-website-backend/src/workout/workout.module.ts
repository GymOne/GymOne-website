import { Module } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';
import { MongodbModule } from '../infrastructure/mongo/mongodb.module';
import { WorkoutProvider } from '../infrastructure/mongo/workout.provider';

@Module({
  imports: [MongodbModule],
  controllers: [WorkoutController],
  providers: [WorkoutService, ...WorkoutProvider],
})
export class WorkoutModule {}
