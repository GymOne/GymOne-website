import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongodbModule } from '../infrastructure/mongo/mongodb.module';
import { UserProvider } from '../infrastructure/mongo/user.provider';

@Module({
  imports: [MongodbModule],
  controllers: [UserController],
  providers: [UserService, ...UserProvider],
  exports: [UserService],
})
export class UserModule {}
