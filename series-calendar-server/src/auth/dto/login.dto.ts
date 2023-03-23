import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(2, 100)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(2, 100)
  password: string;
}
