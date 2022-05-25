import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongodbModule } from '../infrastructure/mongo/mongodb.module';
import { UserProvider } from '../infrastructure/mongo/user.provider';
import { UserImageService } from './user-image.service';
import { UserImageProveder } from '../infrastructure/mongo/user-image.proveder';

@Module({
  imports: [MongodbModule],
  controllers: [UserController],
  providers: [
    UserService,
    UserImageService,
    ...UserProvider,
    ...UserImageProveder,
  ],
  exports: [UserService, UserImageService],
})
export class UserModule {}
