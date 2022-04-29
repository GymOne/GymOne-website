import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const SetSchema = new Schema({
  reps: { type: Number, required: true },
  weight: { type: Number, required: true },
});

export const WorkoutExerciseSchema = new Schema({
  exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise', required: true },
  sets: [SetSchema],
});

export const WorkoutSessionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  workouts: [WorkoutExerciseSchema],
  date: { type: Date, required: true },
});

WorkoutSessionSchema.index(
  {
    userId: 1,
    date: 1,
  },
  {
    unique: true,
  },
);
