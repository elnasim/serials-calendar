import { Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/profile')
  public getProfile(@Req() req) {
    return this.usersService.findOneByToken(req.cookies.token);
  }

  @Post('/profile/favorites-serials/:id')
  public addFavoriteSerial(@Req() req, @Param() params) {
    return this.usersService.addFavoriteSerial(params, req.cookies.token);
  }

  @Delete('/profile/favorites-serials/:id')
  public removeFavoriteSerial(@Req() req, @Param() params) {
    return this.usersService.removeFavoriteSerial(params, req.cookies.token);
  }
}
