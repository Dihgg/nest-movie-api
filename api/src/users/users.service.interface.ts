import {UserEntity} from "./entities/user.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import {LoginUserDto} from "./dto/login-user.dto";

export interface IUserService {
    create(user: CreateUserDto): Promise<LoginUserDto>;
    findByUsername(username: string): Promise<UserEntity>;
}