import { Model } from 'mongoose';
import { User } from './entities/user.entity';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    _getUserDetails(user: User): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    create(name: string, email: string, hashedPassword: string): Promise<User>;
}
