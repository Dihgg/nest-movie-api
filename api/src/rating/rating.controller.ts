import {Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards} from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {ApiBadRequestResponse, ApiCreatedResponse, ApiTags, ApiUnprocessableEntityResponse} from "@nestjs/swagger";


@ApiTags('rating')
@UseGuards(JwtAuthGuard)
@Controller('v1/rating')
export class RatingController {

  @ApiCreatedResponse({ description: "Rating created" })
  @ApiBadRequestResponse({ description: "Rating with incorrect data" })
  @ApiUnprocessableEntityResponse( { description: 'Movie not found' } )
  @Post()
  create(@Request() req, @Body() createRatingDto: CreateRatingDto) {
    return this.ratingService.create(req.user.id, createRatingDto);
  }

  constructor(private readonly ratingService: RatingService) {}

  @Get()
  findAll() {
    return this.ratingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ratingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
    return this.ratingService.update(+id, updateRatingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ratingService.remove(+id);
  }
}
