import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RatingEntity} from "./entities/rating.entity";
import {MoviesService} from "../movies/movies.service";
import {MoviesModule} from "../movies/movies.module";

@Module({
  imports: [
      TypeOrmModule.forFeature([
          RatingEntity
      ]),
      MoviesModule
  ],
  controllers: [RatingController],
  providers: [
      RatingService
  ],
  exports: [
      TypeOrmModule,
      RatingService
  ]
})
export class RatingModule {}
