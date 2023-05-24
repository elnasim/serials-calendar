import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import axios from 'axios';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { IJwtDecode, ITokenValidate, IVerificationTokenPayload } from './types';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Проверка соответствия логина и пароля пользователя.
   */
  public async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findOne(email);

    if (user === null) {
      return null;
    }

    const isPasswordVerified = await bcrypt.compare(pass, user.password);

    if (user && isPasswordVerified) {
      return user;
    }

    return null;
  }

  /**
   * Проверка существования в БД пользователя с указанным email.
   */
  public validateExistsUser(email: string) {
    return this.usersService.findOne(email);
  }

  /**
   * Логин пользователя.
   */
  public async login(user: any) {
    const payload: IJwtDecode = {
      roles: user.roles,
      id: user._id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * Проверка пользователя.
   */
  public checkUser(token: string) {
    if (!token) {
      throw new HttpException(
        { code: 'Не авторизован' },
        HttpStatus.BAD_REQUEST,
      );
    }

    // @ts-ignore
    const { roles, id } = this.jwtService.decode(token);

    return { roles, id };
  }

  /**
   * Создание пользователя в БД.
   */
  public async createUser(createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
  }

  /**
   * Отправка письма для подтверждения email.
   */
  public async sendConfirmationEmail(payload: IVerificationTokenPayload) {
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
      expiresIn: `${process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME}s`,
    });

    const url = `${process.env.EMAIL_CONFIRMATION_URL}?token=${token}`;

    const text = `Ссылка для активации аккаунта - <a href="${url}">подтвердить</a>`;

    try {
      const options = {
        method: 'POST',
        url: process.env.EMAIL_SERVICE_API_URL,
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'api-key': process.env.EMAIL_SERVICE_API_KEY,
        },
        data: {
          sender: {
            email: process.env.EMAIL_SENDER_MAIL,
          },
          to: [{ email: payload.email }],
          htmlContent: `<!DOCTYPE html> <html> <body> ${text} </body> </html>`,
          subject: 'Подтверждение email для serials-calendar.ru',
        },
      };

      await axios.request(options);
    } catch (e) {
      throw new HttpException('Ошибка отправки email', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Валидация токена из письма подтверждения.
   */
  public async validateEmailConfirmationToken(token: ITokenValidate) {
    const decodedToken = this.jwtService.verify(token.token, {
      secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
    });

    const user = await this.usersService.findOne(decodedToken.email);

    const payload: IJwtDecode = {
      id: user._id,
      roles: user.roles,
    };

    if (user.isEmailConfirmed) {
      throw new HttpException(
        {
          message: 'Ссылка не действительна',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await this.usersService.setEmailConfirmed(decodedToken.email);

      return this.jwtService.sign(payload);
    } catch (e) {
      throw new HttpException(
        'Ошибка верификации аккаунта',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
