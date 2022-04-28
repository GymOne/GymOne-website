"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExerciseProvider = void 0;
const exercise_schema_1 = require("./schemas/exercise.schema");
exports.ExerciseProvider = [
    {
        provide: 'EXERCISE_MODEL',
        useFactory: (connection) => connection.model('Exercise', exercise_schema_1.ExerciseSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=exercise.provider.js.map