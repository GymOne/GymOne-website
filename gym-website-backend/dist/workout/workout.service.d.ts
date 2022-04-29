/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
import { CreateWorkoutExerciseSetDto } from './dto/create-workout-exercise-set.dto';
import { Model } from 'mongoose';
import { CreateWorkoutSessionDto } from './dto/create-workout-session.dto';
import { WorkoutSession } from './entities/workout.session.entity';
import { CreateWorkoutExerciseDto } from './dto/create-workout-exercise.dto';
export declare class WorkoutService {
    private readonly workoutModel;
    constructor(workoutModel: Model<WorkoutSession>);
    createWorkoutSession(createWorkoutSessionDto: CreateWorkoutSessionDto): Promise<import("mongoose").Document<unknown, any, WorkoutSession> & WorkoutSession & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    createWorkoutExercise(createWorkoutExerciseDto: CreateWorkoutExerciseDto): Promise<import("mongoose").Document<unknown, any, WorkoutSession> & WorkoutSession & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    createWorkoutExerciseSet(createWorkoutExerciseSetDto: CreateWorkoutExerciseSetDto): Promise<import("mongoose").Document<unknown, any, WorkoutSession> & WorkoutSession & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getWorkoutSession(userId: string, date: Date): Promise<(import("mongoose").Document<unknown, any, WorkoutSession> & WorkoutSession & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
