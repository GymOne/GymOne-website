import { UserService } from './user.service';
import { User } from './entities/user.entity';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUser(id: string): Promise<User | null>;
}
