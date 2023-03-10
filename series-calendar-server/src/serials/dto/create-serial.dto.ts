import { Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSerialDto {
  @ApiProperty()
  @Length(1, 100)
  title: string;
}
