import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../users/dto/login.dto';
import { RegisterDto } from '../users/dto/register.dto';
import { User } from '../users/entities/user.entity';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    hashPassword(password: string): Promise<string>;
    register(user: Readonly<RegisterDto>): Promise<User | any>;
    doesPasswordMatch(password: string, hashedPassword: string): Promise<boolean>;
    validateUser(email: string, password: string): Promise<User | null>;
    login(existingUser: LoginDto): Promise<{
        token: string;
    } | null>;
    verifyJwt(jwt: string): Promise<{
        exp: number;
    }>;
}
