import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateWorkoutExerciseSetDto } from './dto/create-workout-exercise-set.dto';
import { Model } from 'mongoose';
import { CreateWorkoutSessionDto } from './dto/create-workout-session.dto';
import { WorkoutSession } from './entities/workout.session.entity';
import { CreateWorkoutExerciseDto } from './dto/create-workout-exercise.dto';

@Injectable()
export class WorkoutService {
  constructor(
    @Inject('WORKOUT_SESSION_MODEL')
    private readonly workoutModel: Model<WorkoutSession>,
  ) {}

  async createWorkoutSession(createWorkoutSessionDto: CreateWorkoutSessionDto) {
    return await this.workoutModel.create({
      date: createWorkoutSessionDto.date,
      userId: createWorkoutSessionDto.userId,
    });
  }

  async createWorkoutExercise(
    createWorkoutExerciseDto: CreateWorkoutExerciseDto,
  ) {
    return await this.workoutModel
      .findOneAndUpdate(
        { _id: createWorkoutExerciseDto.workoutSessionId },
        {
          $push: {
            workouts: { exerciseId: createWorkoutExerciseDto.exerciseId },
          },
        },
      )
      .exec();
  }

  async createWorkoutExerciseSet(
    createWorkoutExerciseSetDto: CreateWorkoutExerciseSetDto,
  ) {
    return await this.workoutModel
      .findOneAndUpdate(
        { 'workouts._id': createWorkoutExerciseSetDto.workoutExerciseId },
        {
          $push: {
            'workouts.$.sets': {
              weight: createWorkoutExerciseSetDto.weight,
              reps: createWorkoutExerciseSetDto.reps,
            },
          },
        },
      )
      .exec();
  }

  async getWorkoutSession(userId: string, date: Date) {
    return await this.workoutModel
      .find({
        userId: userId,
        date: date,
      })
      .exec();
  }
}
