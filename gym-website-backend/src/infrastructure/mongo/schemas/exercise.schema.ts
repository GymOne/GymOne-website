import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ExerciseSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
});

ExerciseSchema.index(
  {
    userId: 1,
    name: 1,
  },
  {
    unique: true,
  },
);
