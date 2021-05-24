import {IUserService} from "./users.service.interface";
import {CreateUserDto} from "./dto/create-user.dto";
import {UserEntity} from "./entities/user.entity";
import {Stub} from "../testing";

export class UsersServiceStub implements IUserService {
    create(user: CreateUserDto): Promise<UserEntity> {
        return Promise.resolve(Stub.getUserEntity());
    }

    findByUsername(username: string): Promise<UserEntity> {
        return Promise.resolve(Stub.getUserEntity());
    }

}