import {IUser} from "../users/entities/user.interface";
import {UserEntity} from "../users/entities/user.entity";
import {IToken} from "../auth/auth.service.interface";
import {LoginUserDto} from "../users/dto/login-user.dto";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {ListEntity} from "../list/entities/list.entity";
import { hashSync } from 'bcrypt';
import {ListDto} from "../list/dto/list.dto";
import {DeleteListDto} from "../list/dto/delete-list.dto";

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

    static getListEntityArray(n: number): ListEntity[] {
        return Array<ListEntity>(n).fill(Stub.getPublicListEntity());
    }

    static getPublicListEntity(): ListEntity {
        return {
            id: 1,
            name: "Fake List",
            user: Stub.getUserEntity(),
            isPublic: true,
            usersIds: [],
            users: null
        }
    }

    static getPrivateListEntity(): ListEntity {
        return {
            id: 1,
            name: "Fake List",
            user: Stub.getUserEntity(),
            isPublic: false,
            usersIds: [1, 2, 3],
            users: Array<UserEntity>(3).fill(Stub.getUserEntity())
        }
    }

    static getListDto(): ListDto[] {
        return [{
            id: 1,
            name: "Fake List",
            isPublic: true
        }];
    }

    static getDeletedListDto(): DeleteListDto {
        return {
            deleted: true
        }
    }
}
