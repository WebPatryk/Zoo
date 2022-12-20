import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('auth/register')
  // async register(@Request() req) {
  //   return this.authService.register(req.user);
  // }

  @UseGuards(LocalAuthGuard)
  @Post('auth/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Request() req) {
    return this.authService.loggout(req);
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('auth/refresh')
  // async register(@Request() req) {
  //   return this.authService.refresh(req.user);
  // }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  // @UseGuards(JwtAuthGuard)
  // @Get()
  // getHello(): string {
  //   // return this.appService.getHello();
  //   return 'Welcome on my page!';
  // }
}
