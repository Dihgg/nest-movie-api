import {IUser} from "../entities/user.interface";

export class LoginUserDto implements IUser {
    id: number;
    username: string;
    password: string;
}