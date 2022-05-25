import { ImageEntity } from './image.entity';

export class UserImageEntity {
  id?: string;
  userId: string;
  image: ImageEntity;
}
