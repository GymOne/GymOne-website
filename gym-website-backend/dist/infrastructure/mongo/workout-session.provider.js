"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutSessionProvider = void 0;
const workout_schema_1 = require("./schemas/workout.schema");
exports.WorkoutSessionProvider = [
    {
        provide: 'WORKOUT_MODEL',
        useFactory: (connection) => connection.model('Workout', workout_schema_1.WorkoutSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=workout-session.provider.js.map