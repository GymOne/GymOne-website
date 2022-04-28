import { AuthService } from './auth.service';
import { RegisterDto } from '../users/dto/register.dto';
import { LoginDto } from '../users/dto/login.dto';
import { User } from '../users/entities/user.entity';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(user: RegisterDto): Promise<User | null>;
    login(user: LoginDto): Promise<{
        token: string;
    } | null>;
    verifyJwt(payload: {
        jwt: string;
    }): Promise<{
        exp: number;
    }>;
}
