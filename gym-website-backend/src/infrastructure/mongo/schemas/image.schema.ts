import * as mongoose from 'mongoose';
import { WorkoutSessionSchema } from './workout-session.schema';

const Schema = mongoose.Schema;

export const ImageSchema = new Schema({
  data: { type: Buffer, required: true },
  contentType: { type: String },
});

export const UserImageSchema = new Schema({
  //userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  userId: { type: String, required: true },
  image: [ImageSchema],
});

WorkoutSessionSchema.index(
  {
    userId: 1,
  },
  {
    unique: true,
  },
);
