import { Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty()
  @Length(1, 100)
  title: string;

  @ApiProperty()
  digital_date: Date;
}
