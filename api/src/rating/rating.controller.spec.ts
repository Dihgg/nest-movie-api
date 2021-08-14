import { Test, TestingModule } from '@nestjs/testing';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import {RatingServiceStub} from "./rating.service.stub";

describe('RatingController', () => {
  let controller: RatingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RatingController],
      providers: [{
        provide: RatingService,
        useClass: RatingServiceStub
      }],
    }).compile();

    controller = module.get<RatingController>(RatingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
