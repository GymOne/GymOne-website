import { Inject, Injectable } from '@nestjs/common';
import { CreateWorkoutExerciseSetDto } from './dto/create-workout-exercise-set.dto';
import { Model } from 'mongoose';
import { CreateWorkoutSessionDto } from './dto/create-workout-session.dto';
import { WorkoutSession } from './entities/workout.session.entity';
import { CreateWorkoutExerciseDto } from './dto/create-workout-exercise.dto';
import { ConfigService } from '@nestjs/config';

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
            workouts: { exercise: createWorkoutExerciseDto.exerciseId },
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
      .findOne({
        userId: userId,
        date: date,
      })
      .populate('workouts.exercise')
      .exec();
  }

  async getWorkoutExerciseById(id: string) {
    const session = (await this.workoutModel
      .findOne(
        { 'workouts._id': id },
        {
          workouts: {
            $elemMatch: { _id: id },
          },
        },
      )
      .populate('workouts.exercise')
      .exec()) as WorkoutSession;

    if (session == null) {
      return;
    }
    return session.workouts[0];
  }

  async removeExerciseById(id: string) {
    return await this.workoutModel
      .updateOne({ 'workouts._id': id }, { $pull: { workouts: { _id: id } } })
      .exec();
  }

  async removeExerciseSetById(id: string) {
    return await this.workoutModel
      .updateOne(
        { 'workouts.sets._id': id },
        { $pull: { 'workouts.$.sets': { _id: id } } },
      )
      .exec();
  }

  async getAllWorkouts() {
    return await this.workoutModel
      .find({})
      .populate('workouts.exercise')
      .exec();
  }
}
