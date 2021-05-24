import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import {UserEntity} from "../users/entities/user.entity";
import { JwtService } from '@nestjs/jwt';
import {LoginUserDto} from "../users/dto/login-user.dto";
import {IAuthService, IToken} from "./auth.service.interface";

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<UserEntity> {
        const user = await this.usersService.findByUsername(username);
        if (user && user.password === pass) {
            return user;
        }
        return null;
    }

    async login(req: LoginUserDto): Promise<IToken> {
        return {
            token: this.jwtService.sign({
                username: req.username,
                sub: req.id
            })
        };
    }
}