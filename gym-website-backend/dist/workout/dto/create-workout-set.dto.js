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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateWorkoutSetDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const workout_set_entity_1 = require("../entities/workout.set.entity");
class CreateWorkoutSetDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], CreateWorkoutSetDto.prototype, "workoutId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: workout_set_entity_1.Set }),
    __metadata("design:type", typeof (_a = typeof workout_set_entity_1.Set !== "undefined" && workout_set_entity_1.Set) === "function" ? _a : Object)
], CreateWorkoutSetDto.prototype, "set", void 0);
exports.CreateWorkoutSetDto = CreateWorkoutSetDto;
//# sourceMappingURL=create-workout-set.dto.js.map