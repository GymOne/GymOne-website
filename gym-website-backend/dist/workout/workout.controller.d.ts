/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
import { WorkoutService } from './workout.service';
import { CreateWorkoutSessionDto } from './dto/create-workout-session.dto';
import { CreateWorkoutExerciseSetDto } from './dto/create-workout-exercise-set.dto';
import { CreateWorkoutExerciseDto } from './dto/create-workout-exercise.dto';
export declare class WorkoutController {
    private readonly workoutService;
    constructor(workoutService: WorkoutService);
    GetWorkoutSession(userId: string, date: Date): Promise<(import("mongoose").Document<unknown, any, import("./entities/workout.session.entity").WorkoutSession> & import("./entities/workout.session.entity").WorkoutSession & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    CreateWorkoutExerciseSet(createWorkoutExerciseSetDto: CreateWorkoutExerciseSetDto): Promise<import("mongoose").Document<unknown, any, import("./entities/workout.session.entity").WorkoutSession> & import("./entities/workout.session.entity").WorkoutSession & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    WorkoutExercise(createWorkoutExerciseDto: CreateWorkoutExerciseDto): Promise<import("mongoose").Document<unknown, any, import("./entities/workout.session.entity").WorkoutSession> & import("./entities/workout.session.entity").WorkoutSession & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    CreateWorkoutSession(createWorkoutSessionDto: CreateWorkoutSessionDto): Promise<import("mongoose").Document<unknown, any, import("./entities/workout.session.entity").WorkoutSession> & import("./entities/workout.session.entity").WorkoutSession & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
