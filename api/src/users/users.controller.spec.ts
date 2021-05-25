import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {UsersServiceStub} from "./users.service.stub";
import {Stub} from "../testing";
import {UnprocessableEntityException} from "@nestjs/common";

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useClass: UsersServiceStub
        }
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create user', async () => {
    jest.spyOn(UsersServiceStub.prototype, 'create').mockResolvedValue(Stub.getUserEntity());
    const response = await controller.create(Stub.getCreateUserDto())
    expect(response.username).toBe("username");
  });

  it('should not create user', async () => {
    jest.spyOn(UsersServiceStub.prototype, 'create').mockRejectedValue(new UnprocessableEntityException(""));

    await expect(controller.create(Stub.getCreateUserDto())).rejects.toBeDefined();
  });
});
