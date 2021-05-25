import {IUser} from "../entities/user.interface";
import {ApiProperty} from "@nestjs/swagger";

export class LoginUserDto implements IUser {
    @ApiProperty()
    id: number;

    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;
}

export class LoginDto {

    @ApiProperty()
    user: LoginUserDto;
}