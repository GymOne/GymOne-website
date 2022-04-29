"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutProvider = void 0;
const workout_session_schema_1 = require("./schemas/workout-session.schema");
exports.WorkoutProvider = [
    {
        provide: 'WORKOUT_SESSION_MODEL',
        useFactory: (connection) => connection.model('Workout', workout_session_schema_1.WorkoutSessionSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=workout.provider.js.map