import { Inject, Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { Model } from 'mongoose';
import { Exercise } from './entities/exercise.entity';

@Injectable()
export class ExercisesService {
  constructor(
    @Inject('EXERCISE_MODEL') private readonly exerciseModel: Model<Exercise>,
  ) {}

  async create(createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    return this.exerciseModel.create({
      name: createExerciseDto.name,
      userId: createExerciseDto.userId,
    });
  }
  findAllByUserId(userId: string) {
    return this.exerciseModel.find({ userId: userId });
  }

  findOne(id: string) {
    return this.exerciseModel.findById(id);
  }
  remove(id: string) {
    return this.exerciseModel.findByIdAndDelete(id);
  }
}
