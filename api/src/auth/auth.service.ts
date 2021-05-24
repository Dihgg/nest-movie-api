import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import {UserEntity} from "../users/entities/user.entity";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(username: string, pass: string): Promise<UserEntity> {
        const user = await this.usersService.findByUsername(username);
        if (user && user.password === pass) {
            return user;
        }
        return null;
    }
}