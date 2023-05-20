import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';
import { SerialsService } from '../serials/serials.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
    private readonly serialsService: SerialsService,
  ) {}

  public findOne(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  public async findOneByToken(token: string): Promise<UserDocument> {
    const jwtDecoded = this.jwtService.verify(token, {
      secret: process.env.AUTH_SECRET_KEY,
    });

    return this.userModel
      .findById(jwtDecoded.id)
      .select({ _id: 0, password: 0, __v: 0, roles: 0 });
  }

  public async findOneByTokenWithPopulateFavoriteSerials(
    token: string,
  ): Promise<UserDocument> {
    const jwtDecoded = this.jwtService.verify(token, {
      secret: process.env.AUTH_SECRET_KEY,
    });

    return this.userModel
      .findById(jwtDecoded.id)
      .select({ _id: 0, password: 0, __v: 0, roles: 0 })
      .populate('favoriteSerials');
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

  public async addFavoriteSerial(params, token: string) {
    const jwtDecoded = this.jwtService.verify(token, {
      secret: process.env.AUTH_SECRET_KEY,
    });

    const user = await this.userModel.findById(jwtDecoded.id);

    if (user.favoriteSerials.includes(params.id)) {
      return (await user.populate('favoriteSerials')).favoriteSerials;
    }

    user.favoriteSerials = [params.id, ...user.favoriteSerials];

    await user.save();
    return (await user.populate('favoriteSerials')).favoriteSerials;
  }

  public async removeFavoriteSerial(params, token: string) {
    const jwtDecoded = this.jwtService.verify(token, {
      secret: process.env.AUTH_SECRET_KEY,
    });

    const user = await this.userModel.findById(jwtDecoded.id);

    user.favoriteSerials = user.favoriteSerials.filter(
      (serialId) => serialId.toString() !== params.id,
    );

    await user.save();

    return user.populate('favoriteSerials');
  }
}
