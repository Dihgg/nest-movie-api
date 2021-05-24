import {Controller, Get, Post, Body, Param, Query} from '@nestjs/common';
import { UsersService } from './users.service';
import {CreateUserDto} from "./dto/create-user.dto";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findOne(@Query('username') username: string) {
    return this.usersService.findByUsername(username);
  }
}
