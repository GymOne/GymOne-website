import * as mongoose from 'mongoose';

export const FriendRequestSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  isAccepted: { type: Boolean, required: true },
});
