import { Module } from '@nestjs/common';
import { mongodbProvider } from './mongodb.provider';

@Module({
  providers: [...mongodbProvider],
  exports: [...mongodbProvider],
})
export class MongodbModule {}
