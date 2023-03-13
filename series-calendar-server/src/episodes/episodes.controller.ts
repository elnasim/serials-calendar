import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { MonthsEnum } from 'src/common/types';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { Public } from 'src/auth/decorators/Public';

@ApiTags('Episodes')
@Controller('api/episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @ApiBody({ type: [CreateEpisodeDto] })
  @ApiOperation({ summary: 'Создаёт несколько эпизодов по id сериала' })
  @ApiQuery({ name: 'serialId' })
  @Post()
  public create(
    @Body() createEpisodesDto: CreateEpisodeDto[],
    @Query('serialId') serialId: ObjectId,
  ) {
    return this.episodesService.create(serialId, createEpisodesDto);
  }

  @Public()
  @ApiOperation({
    summary: 'Возвращает все эпизоды по указанным месяцу и году',
  })
  @Get('findAllByMonthAndYear')
  public findAllByMonthAndYear(
    @Query('month') month: MonthsEnum,
    @Query('year') year: number,
  ) {
    return this.episodesService.findAllByMonthAndYear(month, year);
  }

  @Public()
  @ApiOperation({
    summary: 'Возвращает последние эпизоды сериалов по указанным месяцу и году',
  })
  @Get('findLastByMonthAndYear')
  public findLastByMonthAndYear(
    @Query('month') month: MonthsEnum,
    @Query('year') year: number,
  ) {
    return this.episodesService.findLastByMonthAndYear(month, year);
  }

  @ApiBody({ type: UpdateEpisodeDto })
  @ApiOperation({ summary: 'Обновляет эпизод по id' })
  @Patch(':id')
  public async update(
    @Param('id') id: ObjectId,
    @Body() updateEpisodeDto: UpdateEpisodeDto,
  ) {
    return this.episodesService.updateOne(id, updateEpisodeDto);
  }

  @ApiBody({ type: String })
  @ApiOperation({ summary: 'Удаляет эпизоды по id' })
  @Delete()
  public remove(
    @Query('serialId') serialId: ObjectId,
    @Body() episodeIds: ObjectId[],
  ) {
    return this.episodesService.remove(serialId, episodeIds);
  }
}
