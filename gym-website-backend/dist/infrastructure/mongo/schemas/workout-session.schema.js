"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutSessionSchema = exports.WorkoutExerciseSchema = exports.SetSchema = void 0;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.SetSchema = new Schema({
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
});
exports.WorkoutExerciseSchema = new Schema({
    exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise', required: true },
    sets: [exports.SetSchema],
});
exports.WorkoutSessionSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    workouts: [exports.WorkoutExerciseSchema],
    date: { type: Date, required: true },
});
exports.WorkoutSessionSchema.index({
    userId: 1,
    date: 1,
}, {
    unique: true,
});
//# sourceMappingURL=workout-session.schema.js.map