import * as mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';

export const mongodbProvider = [
  {
    provide: 'DATABASE_CONNECTION',
    inject: [ConfigService],
    useFactory: (configService: ConfigService): Promise<typeof mongoose> =>
      mongoose.connect(`mongodb://${configService.get('DB')}/nest`),
  },
];
