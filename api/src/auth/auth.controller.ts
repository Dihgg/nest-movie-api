import {Body, Controller, Post, Request, UseGuards} from '@nestjs/common';
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {AuthService} from "./auth.service";
import {LoginDto, LoginUserDto} from "../users/dto/login-user.dto";
import {IncomingMessage} from "http";
import {ApiBasicAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ApiImplicitBody} from "@nestjs/swagger/dist/decorators/api-implicit-body.decorator";

@Controller('v1/auth')
@ApiBasicAuth()
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @ApiTags('auth')
    @ApiOperation({ summary: 'Authenticate User' })
    @ApiResponse({ status: 201, description: 'The user has been successfully logged in.'})
    @ApiResponse({ status: 401, description: 'Unauthorized login attempt.'})
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req: LoginDto) {
        return this.authService.login(req.user);
    }
}
