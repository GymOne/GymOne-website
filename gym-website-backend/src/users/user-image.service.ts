import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { WorkoutSession } from '../workout/entities/workout.session.entity';
import { UserImageEntity } from './entities/user-image.entity';
import { ImageEntity } from './entities/image.entity';
import * as fs from 'fs';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserImageService {
  constructor(
    @Inject('USER_IMAGE_MODEL')
    private readonly userImageModel: Model<UserImageEntity>,
    private userService: UserService,
  ) {}

  async getImage(email: string) {
    return this.userImageModel.findOne({ userId: email }).exec();
  }

  async uploadImage(file: Express.Multer.File) {
    const imageEnt: ImageEntity = {
      data: fs.readFileSync(file.path),
      contentType: file.mimetype,
    };

    await this.userImageModel
      .find({
        userId: file.originalname,
      })
      .remove();

    await this.userImageModel.create(
      {
        userId: file.originalname,
        image: imageEnt,
      },
      function (error, result) {
        if (error) {
          console.log('An error occured uploading an image!');
        }
      },
    );
  }
}
