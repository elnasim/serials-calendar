import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { Response as ResponseType } from 'express';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Public } from './decorators/Public';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  public async login(
    @Request() req,
    @Response({ passthrough: true }) res: ResponseType,
  ) {
    try {
      const { access_token } = await this.authService.login(req.user);
      res.cookie('token', access_token, {
        httpOnly: true,
        maxAge: 2592000000,
      });
    } catch (error) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.FORBIDDEN);
    }
  }

  @Public()
  @Post('registration')
  public async registration(@Body() createUserDto: CreateUserDto) {
    return this.authService.registration(createUserDto);
  }
}
