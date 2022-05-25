import { Connection } from 'mongoose';
import { UserImageSchema } from './schemas/image.schema';

export const UserImageProveder = [
  {
    provide: 'USER_IMAGE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('UserImage', UserImageSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
