import {IAuthService, IToken} from "./auth.service.interface";
import {LoginUserDto} from "../users/dto/login-user.dto";
import {UserEntity} from "../users/entities/user.entity";
import {Stub} from "../testing";

export class AuthServiceStub implements IAuthService {
    login(req: LoginUserDto): Promise<IToken> {
        return Promise.resolve(Stub.getToken());
    }

    validateUser(username: string, pass: string): Promise<UserEntity> {
        return Promise.resolve(Stub.getUserEntity());
    }

}