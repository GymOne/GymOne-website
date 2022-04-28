import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { MongodbModule } from './infrastructure/mongo/mongodb.module';

@Module({
  imports: [AuthModule, UserModule, MongodbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
