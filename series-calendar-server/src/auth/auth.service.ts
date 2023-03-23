import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { IJwtDecode } from './types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (user === null) {
      return null;
    }

    const isPasswordVerified = await bcrypt.compare(pass, user.password);

    if (user && isPasswordVerified) {
      const { ...result } = user;
      return result;
    }

    return null;
  }

  public validateExistsUser(email: string) {
    return this.usersService.findOne(email);
  }

  public async login(user: any) {
    const payload: IJwtDecode = {
      roles: user._doc.roles,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async registration(createUserDto: CreateUserDto) {
    const createdUser = await this.usersService.create(createUserDto);

    const payload: IJwtDecode = {
      roles: createdUser.roles,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
