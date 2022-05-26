import * as mongoose from 'mongoose';
import { WorkoutSessionSchema } from './workout-session.schema';

const Schema = mongoose.Schema;

export const ImageSchema = new Schema({
  data: { type: Buffer, required: true },
  contentType: { type: String },
});

export const UserImageSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  image: [ImageSchema],
});
