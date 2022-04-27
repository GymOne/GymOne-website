import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { UserDetails } from './user.details.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  _getUserDetails(user: UserDocument): UserDetails {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserDetails | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) return null;
    return this._getUserDetails(user);
  }

  async create(
    name: string,
    email: string,
    hashedPassword: string,
    salt: string,
  ): Promise<UserDocument> {
    const newUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
      salt,
    });
    return newUser.save();
  }
}

// export type User = any;
//
// @Injectable()
// export class UserService {
//   private readonly user = [
//     {
//       userId: 1,
//       username: 'user',
//       password: 'user123',
//     },
//     {
//       userId: 2,
//       username: 'mario',
//       password: 'mario123',
//     },
//   ];
//
//   async findOne(username: string): Promise<User | undefined> {
//     return this.user.find((user) => user.username === username);
//   }
// }
