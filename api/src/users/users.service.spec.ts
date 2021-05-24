import {Test, TestingModule} from '@nestjs/testing';
import {UsersService} from './users.service';
import {getRepositoryToken} from "@nestjs/typeorm";
import {UserEntity} from "./entities/user.entity";
import {MockType, repositoryMockFactory} from "../testing";
import {Repository} from "typeorm";
import {IUser} from "./entities/user.interface";

describe('UsersService', () => {
    let service: UsersService;
    let mockRepository: MockType<Repository<UserEntity>>;

    const user: IUser = {
        id: 1,
        username: "username",
        password: "password"
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useFactory: repositoryMockFactory
                }
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
        mockRepository = module.get(getRepositoryToken(UserEntity));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create user', () => {
        mockRepository.create.mockReturnValue(user);
        mockRepository.save.mockReturnValue(user);
        const response = service.create({
            username: "username",
            password: "password"
        });
        expect(response).toBeDefined();
    });

    it('should find user', () => {

        mockRepository.findOne.mockReturnValue(user);
        const response = service.findByUsername("username");
        expect(response).toBeDefined();
    });
});
