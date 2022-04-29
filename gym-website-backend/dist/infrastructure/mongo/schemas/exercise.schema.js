"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExerciseSchema = void 0;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.ExerciseSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
});
exports.ExerciseSchema.index({
    userId: 1,
    name: 1,
}, {
    unique: true,
});
//# sourceMappingURL=exercise.schema.js.map