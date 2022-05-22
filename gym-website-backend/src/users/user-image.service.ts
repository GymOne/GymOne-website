import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { WorkoutSession } from '../workout/entities/workout.session.entity';
import { UserImageEntity } from './entities/user-image.entity';
import { ImageEntity } from './entities/image.entity';

@Injectable()
export class UserImageService {
  constructor(
    @Inject('USER_IMAGE_MODEL')
    private readonly userImageModel: Model<UserImageEntity>,
  ) {}

  async uploadImage(file: Express.Multer.File) {
    const imageEnt: ImageEntity = {
      data: file.path,
      contentType: file.filename,
    };
    console.log(imageEnt);
    this.userImageModel.create({
      userId: '6286926410a5bbba6938dd02',
      image: imageEnt,
    });
  }
}
