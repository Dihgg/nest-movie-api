import { Test, TestingModule } from '@nestjs/testing';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import {ListServiceStub} from "./list.service.stub";
import {Stub} from "../testing";
import {before} from "@nestjs/swagger/dist/plugin";

describe('ListController', () => {
  let controller: ListController;

  const req = {
    user: {
      id: 1
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListController],
      providers: [{
        provide: ListService,
        useClass: ListServiceStub
      }],
    }).compile();

    controller = module.get<ListController>(ListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create List', () => {
    jest.spyOn(ListServiceStub.prototype, 'create').mockResolvedValue(Stub.getListDto()[0]);
    it('should create', async () => {
      const response = await controller.create(req, {
        name: "Fake List",
        isPublic: true
      });
      expect(response.name).toBeDefined();
    });
  });
  describe( 'should find list', () => {
    before(() => {
      jest.spyOn(ListServiceStub.prototype, 'findOne').mockResolvedValue(Stub.getListDto()[0]);
      jest.spyOn(ListServiceStub.prototype, 'findAll').mockResolvedValue(Stub.getListDto());
    });
    it('should find one', async () => {
      const response = await controller.findOne(req, "1");
      expect(response).toBeDefined();
    });
    it('should find a list', async () => {
      const response = await controller.findAll(req);
      expect(response).toBeDefined();
    });
  });

  describe('Should update', () => {
    before(() => {
      jest.spyOn(ListServiceStub.prototype, 'update').mockResolvedValue(Stub.getListDto()[0]);
    });
    it('should update list', async () => {
      const response = await controller.update(req, "1", {
        name: "Fake List",
        isPublic: true
      });
      expect(response).toBeDefined();
    });
  });

  describe('Should delete', () => {
    before(() => {
      jest.spyOn(ListServiceStub.prototype, 'remove').mockResolvedValue(Stub.getDeletedListDto());
    });
    it('should delete list', async () => {
      const response = await controller.remove(req, "1");
      expect(response).toBeDefined();
    });
  });



});
