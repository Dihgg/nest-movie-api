import {Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {AppService} from './app.service';
import {JwtAuthGuard} from "./auth/guards/jwt-auth.guard";

@Controller('v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(@Request() req): string {
    return req.user;
  }
}
