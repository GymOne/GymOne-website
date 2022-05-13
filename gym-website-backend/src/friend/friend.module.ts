import { Module } from '@nestjs/common';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';
import { UserModule } from '../users/user.module';
import { MongodbModule } from '../infrastructure/mongo/mongodb.module';
import { UserController } from '../users/user.controller';
import { UserService } from '../users/user.service';
import { UserProvider } from '../infrastructure/mongo/user.provider';
import { FriendRequestSchema } from '../infrastructure/mongo/schemas/friend-request.schema';
import { FriendProvider } from '../infrastructure/mongo/friend.provider';
import { FriendGateway } from './friend.gateway';

@Module({
  imports: [MongodbModule, UserModule],
  controllers: [FriendController],
  providers: [FriendGateway, FriendService, ...FriendProvider],
})
export class FriendModule {}
