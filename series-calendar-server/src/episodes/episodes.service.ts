import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { Episode, EpisodeDocument } from './schema/episode.schema';
import { SerialsService } from 'src/serials/serials.service';
import { MonthsEnum } from 'src/common/types';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectModel(Episode.name) private episodeModel: Model<EpisodeDocument>,
    private readonly serialService: SerialsService,
  ) {}

  public async create(
    serialId: ObjectId,
    createEpisodesDto: CreateEpisodeDto[],
  ) {
    const newEpisodes: Episode[] = [];
    const episodesId = [];

    for (const episode of createEpisodesDto) {
      const episodeModel = new this.episodeModel(episode);
      newEpisodes.push(episodeModel);
      episodesId.push(episodeModel._id);
    }

    await this.episodeModel.insertMany(newEpisodes);
    return this.serialService.addEpisodesId(serialId, episodesId);
  }

  public findAllByMonthAndYear(month: MonthsEnum, year: number) {
    const dateGTE = new Date(year, +MonthsEnum[month], 1);
    const dateLT = new Date(
      +MonthsEnum[month] === 11 ? year + 1 : year,
      +MonthsEnum[month] === 11 ? 1 : +MonthsEnum[month] + 1,
      1,
    );

    return this.episodeModel
      .find({
        date: {
          $gte: dateGTE,
          $lt: dateLT,
        },
      })
      .populate('serial');
  }

  public updateOne(id: ObjectId, updateEpisodeDto: UpdateEpisodeDto) {
    return this.episodeModel.findByIdAndUpdate(id, updateEpisodeDto, {
      new: true,
    });
  }

  public async remove(serialId: ObjectId, episodesId: ObjectId[]) {
    await this.episodeModel.deleteMany({
      _id: {
        $in: episodesId,
      },
    });
    return this.serialService.removeEpisodeId(serialId, episodesId);
  }
}
