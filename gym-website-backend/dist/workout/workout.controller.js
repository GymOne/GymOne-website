"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutController = void 0;
const common_1 = require("@nestjs/common");
const workout_service_1 = require("./workout.service");
const create_workout_session_dto_1 = require("./dto/create-workout-session.dto");
const create_workout_exercise_set_dto_1 = require("./dto/create-workout-exercise-set.dto");
const create_workout_exercise_dto_1 = require("./dto/create-workout-exercise.dto");
let WorkoutController = class WorkoutController {
    constructor(workoutService) {
        this.workoutService = workoutService;
    }
    GetWorkoutSession(userId, date) {
        return this.workoutService.getWorkoutSession(userId, date);
    }
    CreateWorkoutExerciseSet(createWorkoutExerciseSetDto) {
        return this.workoutService.createWorkoutExerciseSet(createWorkoutExerciseSetDto);
    }
    WorkoutExercise(createWorkoutExerciseDto) {
        return this.workoutService.createWorkoutExercise(createWorkoutExerciseDto);
    }
    CreateWorkoutSession(createWorkoutSessionDto) {
        return this.workoutService.createWorkoutSession(createWorkoutSessionDto);
    }
};
__decorate([
    (0, common_1.Get)('session/:userId/:date'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Date]),
    __metadata("design:returntype", void 0)
], WorkoutController.prototype, "GetWorkoutSession", null);
__decorate([
    (0, common_1.Post)('exercise/set'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_workout_exercise_set_dto_1.CreateWorkoutExerciseSetDto]),
    __metadata("design:returntype", void 0)
], WorkoutController.prototype, "CreateWorkoutExerciseSet", null);
__decorate([
    (0, common_1.Post)('exercise'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_workout_exercise_dto_1.CreateWorkoutExerciseDto]),
    __metadata("design:returntype", void 0)
], WorkoutController.prototype, "WorkoutExercise", null);
__decorate([
    (0, common_1.Post)('session'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_workout_session_dto_1.CreateWorkoutSessionDto]),
    __metadata("design:returntype", void 0)
], WorkoutController.prototype, "CreateWorkoutSession", null);
WorkoutController = __decorate([
    (0, common_1.Controller)('workout'),
    __metadata("design:paramtypes", [workout_service_1.WorkoutService])
], WorkoutController);
exports.WorkoutController = WorkoutController;
//# sourceMappingURL=workout.controller.js.map