import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./entities/user.entity";
import {Repository} from "typeorm";
import {IUserService} from "./users.service.interface";
import {CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UsersService implements IUserService {
    constructor(
        @InjectRepository(UserEntity)
        private repository: Repository<UserEntity>
    ) {
    }

    create(user: CreateUserDto): Promise<UserEntity> {
        const repoUser = this.repository.create({
            username: user.username,
            password: user.password
        });
        return this.repository.save(repoUser);
    }

    findByUsername(username: string): Promise<UserEntity> {
        return this.repository.findOne({
            where: {
                username: username
            }
        });
    }
}
