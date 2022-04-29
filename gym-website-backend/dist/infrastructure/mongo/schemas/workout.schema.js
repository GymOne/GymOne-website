"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutSchema = exports.SessionSchema = exports.WorkoutExerciseSchema = exports.SetSchema = void 0;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.SetSchema = new Schema({
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
});
exports.WorkoutExerciseSchema = new Schema({
    exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise' },
    sets: [exports.SetSchema],
});
exports.SessionSchema = new Schema({
    workouts: [exports.WorkoutExerciseSchema],
    date: { type: Date, required: true, unique: true },
});
exports.WorkoutSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', unique: true },
    sessions: [exports.SessionSchema],
});
//# sourceMappingURL=workout.schema.js.map