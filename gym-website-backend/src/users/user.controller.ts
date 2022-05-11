import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { use } from 'passport';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  getUser(@Param('id') id: string): Promise<User | null> {
    return this.userService.findById(id);
  }

  @Get('getByEmail/:email')
  async getUserByEmail(@Param('email') email: string): Promise<string> {
    const user: User = await this.userService.findByEmail(email);
    return user.name;
  }
}
