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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { User } from './entities/user.entity';
import { use } from 'passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { rules } from '@typescript-eslint/eslint-plugin';
import { UploadUserImageDto } from './dto/upload-user-image.dto';
import { UserImageService } from './user-image.service';

@Controller('user')
export class UserController {
  private fileTest = null;
  constructor(
    private userService: UserService,
    private _imageServ: UserImageService,
  ) {}

  @Get(':id')
  getUser(@Param('id') id: string): Promise<User | null> {
    return this.userService.findById(id);
  }

  @Get('getByEmail/:email')
  async getUserByEmail(@Param('email') email: string): Promise<string> {
    const user: User = await this.userService.findByEmail(email);
    return user.name;
  }

  @Post('uploadProfileImage')
  @UseInterceptors(
    FileInterceptor('image', {
      dest: './uploads',
    }),
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Express.Multer.File> {
    this._imageServ.uploadImage(file);
    return this.fileTest;
  }

  @Post('getMyImage')
  getImage(): Promise<any> {
    console.log('Waow');
    return this._imageServ.getImage();
  }
}
