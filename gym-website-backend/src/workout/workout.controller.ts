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
  GetWorkoutSession(@Param('userId') userId: string,@Param('date')date: Date ) {
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

  @Post('exercise')
  WorkoutExercise(@Body() createWorkoutExerciseDto: CreateWorkoutExerciseDto) {
    return this.workoutService.createWorkoutExercise(createWorkoutExerciseDto);
  }

  @Post('session')
  CreateWorkoutSession(
    @Body() createWorkoutSessionDto: CreateWorkoutSessionDto,
  ) {
    return this.workoutService.createWorkoutSession(createWorkoutSessionDto);
  }
}
