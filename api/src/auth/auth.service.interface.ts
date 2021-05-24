import {UserEntity} from "../users/entities/user.entity";
import {LoginUserDto} from "../users/dto/login-user.dto";

export interface IAuthService {
    validateUser(username: string, pass: string): Promise<UserEntity>;
    login(req: LoginUserDto): Promise<IToken>;
}

export interface IToken {
    token: string;
}