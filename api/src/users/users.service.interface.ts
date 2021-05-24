import {UserEntity} from "./entities/user.entity";

export interface IUserService {
    findByUsername(username: string): Promise<UserEntity>;
}