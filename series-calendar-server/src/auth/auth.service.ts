import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { IJwtDecode, ITokenValidate, IVerificationTokenPayload } from './types';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
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

    const text = `Ссылка для активации аккаунта - ${url}`;

    try {
      await this.mailerService.sendMail({
        to: payload.email,
        from: process.env.SENDER_MAIL,
        subject: 'Confirm email for serials-calendar.ru',
        text,
        html: `${text}`,
      });
    } catch (e) {
      throw new HttpException('Ошибка отправки email', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Валидация токена из письма подтверждения.
   */
  public async validateEmailConfirmationToken(payload: ITokenValidate) {
    const decodedToken = this.jwtService.verify(payload.token, {
      secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
    });

    const user = await this.usersService.findOne(decodedToken.email);

    if (user.isEmailConfirmed) {
      throw new HttpException(
        'Ссылка активации недействительна',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await this.usersService.setEmailConfirmed(decodedToken.email);

      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (e) {
      throw new HttpException(
        'Ошибка верификации аккаунта',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
