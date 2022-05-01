import { Connection } from 'mongoose';
import { FriendRequestSchema } from './schemas/friend-request.schema';

export const FriendProvider = [
  {
    provide: 'FRIEND_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Friend', FriendRequestSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
