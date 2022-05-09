import { Inject, Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { Model } from 'mongoose';
import { Exercise } from './entities/exercise.entity';
import { WorkoutSession } from "../workout/entities/workout.session.entity";

@Injectable()
export class ExercisesService {
  constructor(
    @Inject('EXERCISE_MODEL') private readonly exerciseModel: Model<Exercise>,
    @Inject('WORKOUT_SESSION_MODEL') private readonly workoutModel: Model<WorkoutSession>,
  ) {}

  async create(createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    return await this.exerciseModel.create({
      name: createExerciseDto.name,
      userId: createExerciseDto.userId,
    });
  }
  async findAllByUserId(userId: string) {
    return await this.exerciseModel.find({ userId: userId }).exec();
  }

  async findOneById(id: string) {
    return await this.exerciseModel.findById(id).exec();
  }
  async removeById(id: string) {
    return await this.exerciseModel.find({ _id: id }).deleteOne().exec();
  }
}
