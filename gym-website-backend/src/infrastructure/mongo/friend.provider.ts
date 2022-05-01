import { Connection } from 'mongoose';
import { FriendScema } from './schemas/friend.scema';

export const UserProvider = [
  {
    provide: 'FRIEND_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Friend', FriendScema),
    inject: ['DATABASE_CONNECTION'],
  },
];
