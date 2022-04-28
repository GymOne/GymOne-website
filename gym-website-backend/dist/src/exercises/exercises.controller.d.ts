import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
export declare class ExercisesController {
    private readonly exercisesService;
    constructor(exercisesService: ExercisesService);
    create(createExerciseDto: CreateExerciseDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateExerciseDto: UpdateExerciseDto): string;
    remove(id: string): string;
}
