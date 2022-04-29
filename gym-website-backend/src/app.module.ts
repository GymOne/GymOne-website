import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { MongodbModule } from './infrastructure/mongo/mongodb.module';
import { ExercisesModule } from './exercises/exercises.module';
import { WorkoutModule } from './workout/workout.module';

@Module({
  imports: [AuthModule, UserModule, MongodbModule, ExercisesModule, WorkoutModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
