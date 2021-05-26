import {IUserService} from "./users.service.interface";
import {CreateUserDto} from "./dto/create-user.dto";
import {UserEntity} from "./entities/user.entity";
import {Stub} from "../testing";
import {LoginUserDto} from "./dto/login-user.dto";

export class UsersServiceStub implements IUserService {
    create(user: CreateUserDto): Promise<LoginUserDto> {
        return Promise.resolve(Stub.getLoginUserDto());
    }

    findByUsername(username: string): Promise<UserEntity> {
        return Promise.resolve(Stub.getUserEntity());
    }

}