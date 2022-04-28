"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExerciseSchema = void 0;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.ExerciseSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true, unique: true },
});
//# sourceMappingURL=exercise.schema.js.map