import {Test, TestingModule} from '@nestjs/testing';
import {RatingService} from './rating.service';
import {getRepositoryToken} from "@nestjs/typeorm";
import {ListEntity} from "../list/entities/list.entity";
import {MockType, repositoryMockFactory} from "../testing";
import {RatingEntity} from "./entities/rating.entity";
import {Repository} from "typeorm";
import {MoviesService} from "../movies/movies.service";
import {MoviesServiceStub} from "../movies/movies.service.stub";

describe('RatingService', () => {
    let service: RatingService;
    let mockListRepository: MockType<Repository<RatingEntity>>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: getRepositoryToken(RatingEntity),
                    useFactory: repositoryMockFactory
                }, {
                    provide: MoviesService,
                    useClass: MoviesServiceStub
                },
                RatingService
            ],
        }).compile();

        service = module.get<RatingService>(RatingService);
        mockListRepository = module.get(getRepositoryToken(RatingEntity));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
