import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post('create')
  create(@Body() createExerciseDto: CreateExerciseDto) {
    return this.exercisesService.create(createExerciseDto);
  }

  @Get('findByUserId:userId')
  findAllByUserId(@Param('userId') userId: string) {
    return this.exercisesService.findAllByUserId(userId);
  }

  @Get('findById:id')
  findOneById(@Param('id') id: string) {
    return this.exercisesService.findOne(id);
  }

  @Delete('deleteById:id')
  remove(@Param('id') id: string) {
    return this.exercisesService.remove(id);
  }
}
