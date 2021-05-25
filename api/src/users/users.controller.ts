import {Controller, Get, Post, Body, Param, Query} from '@nestjs/common';
import { UsersService } from './users.service';
import {CreateUserDto} from "./dto/create-user.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserEntity} from "./entities/user.entity";
import {LoginUserDto} from "./dto/login-user.dto";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags('users')
  @ApiOperation({
    summary: 'Create User',
    description: 'Create User'
  })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: LoginUserDto})
  @ApiResponse({ status: 422, description: 'The user already exists.'})
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<LoginUserDto> {
    return this.usersService.create(createUserDto);
  }

}
