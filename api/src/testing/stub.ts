import {IUser} from "../users/entities/user.interface";
import {UserEntity} from "../users/entities/user.entity";
import {IToken} from "../auth/auth.service.interface";
import {LoginUserDto} from "../users/dto/login-user.dto";
import {CreateUserDto} from "../users/dto/create-user.dto";
import { hashSync } from 'bcrypt';

export class Stub {
    static getUser(): IUser {
        return {
            id: 1,
            username: "username",
            password: "password"
        };
    }
    static getUserEntity(): UserEntity {
        const user = this.getUser() as UserEntity;
        user.password = hashSync(user.password, 10);
        return user;
    }

    static getCreateUserDto(): CreateUserDto {
        return this.getUser() as CreateUserDto;
    }

    static getLoginUserDto(): LoginUserDto {
        return this.getUser() as LoginUserDto;
    }
    static getToken(): IToken {
        return {
            token: "fake_jwt_token"
        };
    }
}