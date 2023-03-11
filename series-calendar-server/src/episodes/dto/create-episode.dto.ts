import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class CreateEpisodeDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  episode_number: number;

  @ApiProperty()
  season: number;

  @ApiProperty()
  is_last_season_episode: boolean;

  @ApiProperty()
  serial: ObjectId;
}
