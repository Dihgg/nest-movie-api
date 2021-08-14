import {Injectable, UnprocessableEntityException} from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {RatingEntity} from "./entities/rating.entity";
import {MoviesService} from "../movies/movies.service";
import {ERRORS} from "../errors/errors.enum";
import {IRatingService} from "./rating.service.interface";

@Injectable()
export class RatingService implements IRatingService {

  constructor(
      @InjectRepository(RatingEntity)
      private repository: Repository<RatingEntity>,
      private moviesService: MoviesService
  ) {
  }

  async create(userId: number, request: CreateRatingDto) {
      try {
          const movie = await this.moviesService.details(request.tmdb_id);
          console.log("Movie", movie.id, movie.title);
          const rating = await this.repository.create({
              user: {
                  id: userId
              },
              rating: request.rating,
              stars: request.stars,
              comment: request.comment,
              tmdb_id: request.tmdb_id
          });
          return await this.repository.save(rating);
      } catch (e) {
          throw new UnprocessableEntityException(ERRORS.MOVIE_NOT_FOUND);
      }
  }

  findAll() {
    return `This action returns all rating`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rating`;
  }

  update(id: number, updateRatingDto: UpdateRatingDto) {
    return `This action updates a #${id} rating`;
  }

  remove(id: number) {
    return `This action removes a #${id} rating`;
  }
}
