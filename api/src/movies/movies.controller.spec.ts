import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import {MoviesServiceStub} from "./movies.service.stub";
import {HttpModule} from "@nestjs/common";

describe('MoviesController', () => {
  let controller: MoviesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
          HttpModule
      ],
      controllers: [MoviesController],
      providers: [
        {
          provide: MoviesService,
          useClass: MoviesServiceStub
        }
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
