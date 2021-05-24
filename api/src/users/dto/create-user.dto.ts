import {IUser} from '../entities/user.interface';
import {UserEntity} from "../entities/user.entity";

export class CreateUserDto implements IUser {
    username: string;
    password: string;
}
