import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  public findOne(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }

  public async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.find({
      username: createUserDto.username,
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
}
