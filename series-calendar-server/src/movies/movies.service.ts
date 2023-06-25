import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie, MovieDocument } from './schema/movies.schema';
import { MonthsEnum } from '../common/types';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
  ) {}

  /**
   * Создаёт новый фильм.
   */
  public async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    try {
      const createdMovie = await this.movieModel.create(createMovieDto);
      return createdMovie;
    } catch (error) {
      throw new HttpException(
        'Фильм с таким названием уже существует',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  /**
   * Возвращает фильмы в заданном количестве и c заданным отступом.
   */
  public findByOffset(limit: number = 0, skip: number = 0) {
    return this.movieModel.find(null, null, {
      limit,
      skip,
    });
  }

  public findAllByMonthAndYear(month: MonthsEnum, year: number) {
    const dateGT = new Date(year, +MonthsEnum[month], 1);
    const dateLT = new Date(
      +MonthsEnum[month] === 11 ? +year + 1 : year,
      +MonthsEnum[month] === 11 ? 0 : +MonthsEnum[month] + 1,
      1,
    );

    return this.movieModel.find({
      digital_date: {
        $gt: dateGT,
        $lt: dateLT,
      },
    });
  }

  /**
   * Возвращает фильм по id.
   */
  public findOne(id: string) {
    return this.movieModel.findById(id);
  }

  /**
   * Обновляет фильм по id.
   */
  public update(id: ObjectId, updateMovieDto: UpdateMovieDto) {
    return this.movieModel.findByIdAndUpdate(id, updateMovieDto, {
      new: true,
    });
  }

  /**
   * Удаляет фильм по id.
   */
  public remove(id: ObjectId) {
    return this.movieModel.findOneAndDelete({ _id: id });
  }
}
