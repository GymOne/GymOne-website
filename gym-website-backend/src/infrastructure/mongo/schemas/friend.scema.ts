import * as mongoose from 'mongoose';

export const FriendScema = new mongoose.Schema({
  sender: { type: Number, required: true },
  receiver: { type: Number, required: true },
  isFriend: { type: Boolean, required: true },
});
