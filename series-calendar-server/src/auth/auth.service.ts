import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

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

  public async login(user: any) {
    return {
      access_token: this.jwtService.sign({ username: user.username }),
    };
  }

  public async registration(createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
    return {
      access_token: this.jwtService.sign({
        username: createUserDto.username,
      }),
    };
  }
}
