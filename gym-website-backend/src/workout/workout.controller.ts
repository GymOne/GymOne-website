import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkoutSessionDto } from './dto/create-workout-session.dto';
import { CreateWorkoutExerciseSetDto } from './dto/create-workout-exercise-set.dto';
import { CreateWorkoutExerciseDto } from './dto/create-workout-exercise.dto';

@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Get('session/:userId/:date')
  GetWorkoutSession(
    @Param('userId') userId: string,
    @Param('date') date: Date,
  ) {
    return this.workoutService.getWorkoutSession(userId, date);
  }

  @Post('exercise/set')
  CreateWorkoutExerciseSet(
    @Body() createWorkoutExerciseSetDto: CreateWorkoutExerciseSetDto,
  ) {
    return this.workoutService.createWorkoutExerciseSet(
      createWorkoutExerciseSetDto,
    );
  }

  @Delete('exercise/set/deleteById/:id')
  removeExerciseSetById(@Param('id') id: string) {
    return this.workoutService.removeExerciseSetById(id);
  }
  @Post('exercise')
  CreateWorkoutExercise(@Body() createWorkoutExerciseDto: CreateWorkoutExerciseDto) {
    return this.workoutService.createWorkoutExercise(createWorkoutExerciseDto);
  }

  @Delete('exercise/deleteById/:id')
  RemoveExerciseById(@Param('id') id: string) {
    return this.workoutService.removeExerciseById(id);
  }

  @Post('session')
  CreateWorkoutSession(
    @Body() createWorkoutSessionDto: CreateWorkoutSessionDto,
  ) {
    return this.workoutService.createWorkoutSession(createWorkoutSessionDto);
  }
}
