import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
export declare class ExercisesService {
    create(createExerciseDto: CreateExerciseDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateExerciseDto: UpdateExerciseDto): string;
    remove(id: number): string;
}
