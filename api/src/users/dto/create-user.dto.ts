import {IUser} from '../entities/user.interface';

export class CreateUserDto implements IUser {
    username: string;
    password: string;
}
