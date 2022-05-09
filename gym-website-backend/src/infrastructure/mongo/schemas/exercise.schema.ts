import * as mongoose from 'mongoose';
import { Logger } from '@nestjs/common';

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

ExerciseSchema.pre('deleteOne', async function (next) {
  const id = this.getQuery()['_id'];
  await mongoose
    .model('Workout')
    .updateMany({ 'workouts.exercise': id }, { $pull: { workouts: { exercise: id } } })
    .exec();
  next();
});
