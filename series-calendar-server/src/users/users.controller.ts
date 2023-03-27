import { Controller, Get, Req } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/profile')
  public getProfile(@Req() req) {
    return this.usersService.findOneByToken(req.cookies.token);
  }
}
