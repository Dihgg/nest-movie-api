import {Test, TestingModule} from '@nestjs/testing';
import {AuthService} from './auth.service';
import {Stub} from "../testing";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {LocalStrategy} from "./strategies/local.strategy";
import {JWT_CONSTANTS} from "./constants";
import {UsersService} from "../users/users.service";
import {UsersServiceStub} from "../users/users.service.stub";
import {LoginUserDto} from "../users/dto/login-user.dto";

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule.register({
                    secret: JWT_CONSTANTS.secret,
                    signOptions: {expiresIn: '60s'},
                })
            ],
            providers: [
                LocalStrategy,
                JwtStrategy,
                {
                    provide: UsersService,
                    useClass: UsersServiceStub
                },
                AuthService
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('should validate user', () => {
        it('should find the user', async () => {
            jest.spyOn(UsersServiceStub.prototype, "findByUsername").mockResolvedValue(Stub.getUserEntity());
            const response = await service.validateUser("username", "password");
            expect(response.username).toBeDefined();
        });
        it('should not find the user', async () => {
            jest.spyOn(UsersServiceStub.prototype, "findByUsername").mockResolvedValue(null);
            const response = await service.validateUser("username", "password");
            expect(response).toBeNull();
        });
    });

    describe('should login', () => {
        it('should return jwt', async () => {
            const response = await service.login(Stub.getLoginUserDto());
            expect(response.token).toBeDefined();
        });
    });
});
