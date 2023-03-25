import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  Response,
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

@Controller('auth')
@Roles(RolesEnum.ADMIN)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  public async login(
    @Request() req,
    @Response({ passthrough: true }) res: ResponseType,
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
    await this.authService.sendConfirmationEmail({
      email: createUserDto.email,
    });

    return this.authService.createUser(createUserDto);
  }

  @Public()
  @Post('validate-email')
  public async validateEmail(@Body() token: ITokenValidate) {
    return this.authService.validateEmailConfirmationToken(token);
  }

  @Roles(RolesEnum.ADMIN)
  @Post('validate-admin')
  public async validateAdmin(
    @Request() req,
    @Response({ passthrough: true }) res: ResponseType,
  ) {
    return null;
  }
}
