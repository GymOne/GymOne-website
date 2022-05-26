import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private readonly userModel: Model<User>,
  ) {}

  async _getUserDetails(user: User): Promise<User> {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) return null;
    return this._getUserDetails(user);
  }

  async create(
    name: string,
    email: string,
    hashedPassword: string,
  ): Promise<User> {
    const newUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
    });
    return newUser.save();
  }

  async attachImagePath(path: string, email: string) {
    this.userModel.updateOne({ email }, { $set: { mobileImgPath: path } }).exec();
  }

  async getMobileImgUri(email: string): Promise<string>{
    const gj = (await this.userModel.findOne({ email })) as User;
    return gj.mobileImgPath;
  }
}
