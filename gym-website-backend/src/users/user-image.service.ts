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

  async getImage() {
    return this.userImageModel
      .findOne({ userId: '6286926410a5bbba6938dd02' })
      .exec();
  }

  async uploadImage(file: Express.Multer.File) {
    const imageEnt: ImageEntity = {
      data: fs.readFileSync(file.path),
      contentType: file.mimetype,
    };
    console.log(imageEnt);
    this.userImageModel.create({
      userId: '6286926410a5bbba6938dd02',
      image: imageEnt,
    });
  }
}
