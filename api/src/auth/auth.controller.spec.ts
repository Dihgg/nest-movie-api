import {Test, TestingModule} from '@nestjs/testing';
import {AuthController} from './auth.controller';
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {JWT_CONSTANTS} from "./constants";
import {AuthService} from "./auth.service";
import {LocalStrategy} from "./strategies/local.strategy";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {UsersService} from "../users/users.service";
import {UsersServiceStub} from "../users/users.service.stub";
import {AuthServiceStub} from "./auth.service.stub";
import {Stub} from "../testing";

describe('AuthController', () => {
    let controller: AuthController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                PassportModule,
                JwtModule.register({
                    secret: JWT_CONSTANTS.secret,
                    signOptions: {
                        expiresIn: '60m'
                    }
                })
            ],
            providers: [
                {
                    provide: AuthService,
                    useClass: AuthServiceStub
                },
                LocalStrategy,
                JwtStrategy,
                {
                    provide: UsersService,
                    useClass: UsersServiceStub
                }
            ],
            controllers: [AuthController],
        }).compile();

        controller = module.get<AuthController>(AuthController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should login successfully', async () => {
        jest.spyOn(AuthServiceStub.prototype, "login").mockResolvedValue(Stub.getToken());
        const response = await controller.login({
            username: "username",
            password: "password"
        });
        expect(response.token).toBeDefined();
    });
});
