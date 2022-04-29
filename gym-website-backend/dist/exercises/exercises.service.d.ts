/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { Model } from 'mongoose';
import { Exercise } from './entities/exercise.entity';
export declare class ExercisesService {
    private readonly exerciseModel;
    constructor(exerciseModel: Model<Exercise>);
    create(createExerciseDto: CreateExerciseDto): Promise<Exercise>;
    findAllByUserId(userId: string): Promise<(import("mongoose").Document<unknown, any, Exercise> & Exercise & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findOneById(id: string): Promise<import("mongoose").Document<unknown, any, Exercise> & Exercise & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    removeById(id: string): Promise<import("mongoose").Document<unknown, any, Exercise> & Exercise & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
