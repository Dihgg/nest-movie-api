import {Test, TestingModule} from '@nestjs/testing';
import {ListService} from './list.service';
import {getRepositoryToken} from "@nestjs/typeorm";
import {UserEntity} from "../users/entities/user.entity";
import {MockType, repositoryMockFactory, Stub} from "../testing";
import {ListEntity} from "./entities/list.entity";
import {Repository} from "typeorm";
import {NotFoundException, UnprocessableEntityException} from "@nestjs/common";
import {before} from "@nestjs/swagger/dist/plugin";

describe('ListService', () => {
    let service: ListService;
    let mockListRepository: MockType<Repository<ListEntity>>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ListService,
                {
                    provide: getRepositoryToken(ListEntity),
                    useFactory: repositoryMockFactory
                }
            ],
        }).compile();

        service = module.get<ListService>(ListService);
        mockListRepository = module.get(getRepositoryToken(ListEntity));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('Should Create Lists', () => {
      it('Should create a public list', async () => {
        mockListRepository.create.mockReturnValue(Stub.getPublicListEntity());
        mockListRepository.save.mockReturnValue(Stub.getPublicListEntity());
        const response = await service.create(1, {
          name: 'Fake List',
          isPublic: true
        });
        expect(response).toBeDefined();
      });
      it('Should create a private list', async () => {
        mockListRepository.create.mockReturnValue(Stub.getPrivateListEntity());
        mockListRepository.save.mockReturnValue(Stub.getPrivateListEntity());
        const response = await service.create(1, {
          name: 'Fake List',
          isPublic: false,
          users: [1,2,3]
        });
        expect(response).toBeDefined();
      });
    });

    describe('Should Not Create Lists', () => {
      it('Should throw unprocessable', async () => {
        await expect(service.create(1, {
          name: "Fake List",
          isPublic: false,
          users: null
        })).rejects.toThrow(UnprocessableEntityException);
      });
    });

    describe('Should find lists', () => {
       it('Should find all lists', async () => {
         mockListRepository.find.mockImplementation(async () => {
             return Promise.resolve(Stub.getListEntityArray(1));
         });
         const response = await service.findAll(1);
         expect(response).toBeDefined();
       });
       it('Should find one list', async () => {
            mockListRepository.find.mockReturnValue(Stub.getPublicListEntity());
            const response = await service.findOne(1, 1);
            expect(response).toBeDefined();
        });
       it('Should NOT find one list', async () => {
           mockListRepository.findOne.mockReturnValue(null);
           await expect(service.findOne(1, 1)).rejects.toThrow(NotFoundException);
        });
    });

    describe('Should update lists', () => {
        before(() => {
            mockListRepository.save.mockReturnValue(Stub.getPublicListEntity());
            jest.spyOn(ListService.prototype, 'findOne').mockResolvedValue(Stub.getListDto()[0]);
        });

        it('Should update list', async () => {
            const response = await service.update(1,1, {
                name: "Fake List",
                isPublic: true
            });
            expect(response).toBeDefined();
        });

        it('Should update list', async () => {
            const response = await service.update(1,1, {});
            expect(response).toBeDefined();
        });
    });

    describe( 'Should delete list', () => {
        it('should delete', async() => {
            mockListRepository.findOne.mockReturnValue(Stub.getPublicListEntity());
            mockListRepository.delete.mockReturnValue({ affected: 1 });
            const response = await service.remove(1, 1);
            expect(response.deleted).toBeTruthy();
        });
    });
});
