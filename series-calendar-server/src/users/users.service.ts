import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  public findOne(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  public async findOneByToken(token: string) {
    const jwtDecoded = this.jwtService.verify(token, {
      secret: process.env.AUTH_SECRET_KEY,
    });

    return this.userModel
      .findById(jwtDecoded.id)
      .select({ email: 1, roles: 1 });
  }

  public async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.find({
      email: createUserDto.email,
    });

    if (user.length > 0) {
      throw new HttpException('User already exists', HttpStatus.OK);
    }

    const passwordHash = await bcrypt.hash(createUserDto.password, 10);

    const createdUser = new this.userModel({
      ...createUserDto,
      password: passwordHash,
    });
    return createdUser.save();
  }

  public async setEmailConfirmed(email: string) {
    return this.userModel.findOneAndUpdate(
      { email },
      {
        isEmailConfirmed: true,
      },
    );
  }
}
