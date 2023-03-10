import { IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @Length(2, 100)
  username: string;

  @ApiProperty()
  @Length(2, 100)
  @IsEmail()
  email: string;

  @ApiProperty()
  @Length(2, 100)
  password: string;
}
