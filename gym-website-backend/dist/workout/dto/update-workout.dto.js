"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWorkoutDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_workout_dto_1 = require("./create-workout.dto");
class UpdateWorkoutDto extends (0, swagger_1.PartialType)(create_workout_dto_1.CreateWorkoutDto) {
}
exports.UpdateWorkoutDto = UpdateWorkoutDto;
//# sourceMappingURL=update-workout.dto.js.map