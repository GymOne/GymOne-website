import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { MongodbModule } from './infrastructure/mongo/mongodb.module';
import { ExercisesModule } from './exercises/exercises.module';
import { WorkoutModule } from './workout/workout.module';
import { FriendModule } from './friend/friend.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    AuthModule,
    UserModule,
    MongodbModule,
    ExercisesModule,
    WorkoutModule,
    FriendModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `environments/.env.${process.env.STAGE.trim()}`,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {
    console.log("STAGE:");
    console.log(process.env.STAGE.trim());
  }
}
