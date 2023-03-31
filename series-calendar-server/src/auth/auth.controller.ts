import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response as ResponseType } from 'express';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Public } from './decorators/public.decorator';
import { Roles } from './decorators/roles.decorator';
import { ITokenValidate, RolesEnum } from './types';
import { RegistrationGuard } from './registration.guard';
import * as process from 'process';

@Controller('auth')
@Roles(RolesEnum.ADMIN)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(
    @Req() req,
    @Res({ passthrough: true }) res: ResponseType,
  ) {
    const { access_token } = await this.authService.login(req.user);

    res.cookie('token', access_token, {
      httpOnly: true,
      maxAge: 2592000000,
    });
  }

  @Public()
  @UseGuards(RegistrationGuard)
  @Post('registration')
  public async registration(@Body() createUserDto: CreateUserDto) {
    if (process.env.IS_USE_EMAIL_CONFIRMATION === 'true') {
      await this.authService.sendConfirmationEmail({
        email: createUserDto.email,
      });
    }

    return this.authService.createUser(createUserDto);
  }

  @Public()
  @Post('validate-email')
  public async validateEmail(
    @Body() token: ITokenValidate,
    @Res({ passthrough: true }) res,
  ) {
    const accessToken = await this.authService.validateEmailConfirmationToken(
      token,
    );

    res.cookie('token', accessToken, {
      httpOnly: true,
      maxAge: 2592000000,
    });
  }

  @Public()
  @Get('check-user')
  public checkUser(@Req() req) {
    return this.authService.checkUser(req.cookies.token);
  }

  @Roles(RolesEnum.ADMIN)
  @Post('validate-admin')
  public async validateAdmin() {
    return null;
  }
}
