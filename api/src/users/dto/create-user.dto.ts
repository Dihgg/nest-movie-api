import {IUser} from '../entities/user.interface';
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto implements IUser {
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;
}
