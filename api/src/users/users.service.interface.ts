import {UserEntity} from "./entities/user.entity";
import {CreateUserDto} from "./dto/create-user.dto";

export interface IUserService {
    create(user: CreateUserDto): Promise<UserEntity>;
    findByUsername(username: string): Promise<UserEntity>;
}