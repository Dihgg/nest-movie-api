import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import {HttpModule, HttpService} from "@nestjs/common";

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
          MoviesService
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
