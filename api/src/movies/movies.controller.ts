import {Body, Controller, Get, HttpService, Param, Post, Query, Request, UseGuards} from '@nestjs/common';
import { MoviesService } from './movies.service';
import {ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {TmdbMoviesDetails, TmdbMoviesResponseDto} from "./dto/tmdb.movies.response.dto";

@ApiTags('movies')
@UseGuards(JwtAuthGuard)
@Controller('v1/movies')
export class MoviesController {
  constructor(
      private readonly moviesService: MoviesService
  ) { }

  @ApiOperation({
    summary: 'Search TMDB for a movie',
  })
  @ApiQuery({ name: "query", description: "The query for TMDB API"})
  @ApiOkResponse({ description: "should return a movie", type: TmdbMoviesResponseDto })
  @Get('search')
  async search(@Query('query') query: string): Promise<TmdbMoviesResponseDto> {
    return await this.moviesService.search(query);
  }

  @ApiOperation({ summary: 'GET TMDB details for a movie' })
  @ApiQuery({ name: "query", description: "The query for TMDB API"})
  @ApiOkResponse({ description: "Movie queried successfully" })
  @Get('details/:id')
  async details(@Param('id') id: number): Promise<TmdbMoviesDetails> {
    return await this.moviesService.details(id);
  }

}
