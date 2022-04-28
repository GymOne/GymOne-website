/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
export declare class ExercisesController {
    private readonly exercisesService;
    constructor(exercisesService: ExercisesService);
    create(createExerciseDto: CreateExerciseDto): Promise<import("./entities/exercise.entity").Exercise>;
    findAllByUserId(userId: string): import("mongoose").Query<(import("mongoose").Document<unknown, any, import("./entities/exercise.entity").Exercise> & import("./entities/exercise.entity").Exercise & {
        _id: import("mongoose").Types.ObjectId;
    })[], import("mongoose").Document<unknown, any, import("./entities/exercise.entity").Exercise> & import("./entities/exercise.entity").Exercise & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, import("./entities/exercise.entity").Exercise>;
    findOneById(id: string): import("mongoose").Query<import("mongoose").Document<unknown, any, import("./entities/exercise.entity").Exercise> & import("./entities/exercise.entity").Exercise & {
        _id: import("mongoose").Types.ObjectId;
    }, import("mongoose").Document<unknown, any, import("./entities/exercise.entity").Exercise> & import("./entities/exercise.entity").Exercise & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, import("./entities/exercise.entity").Exercise>;
    remove(id: string): import("mongoose").Query<import("mongoose").Document<unknown, any, import("./entities/exercise.entity").Exercise> & import("./entities/exercise.entity").Exercise & {
        _id: import("mongoose").Types.ObjectId;
    }, import("mongoose").Document<unknown, any, import("./entities/exercise.entity").Exercise> & import("./entities/exercise.entity").Exercise & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, import("./entities/exercise.entity").Exercise>;
}
