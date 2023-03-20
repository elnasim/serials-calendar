import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateSerialDto } from './dto/create-serial.dto';
import { UpdateSerialDto } from './dto/update-serial.dto';
import { Serial, SerialDocument } from './schema/serial.schema';

@Injectable()
export class SerialsService {
  constructor(
    @InjectModel(Serial.name) private serialModel: Model<SerialDocument>,
  ) {}

  /**
   * Создаёт новый сериал.
   */
  public async create(createSerialDto: CreateSerialDto): Promise<Serial> {
    try {
      const createdSerial = await this.serialModel.create(createSerialDto);
      return createdSerial;
    } catch (error) {
      throw new HttpException(
        'Сериал с таким названием уже существует',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  /**
   * Возвращает сериалы в заданном количестве и c заданным отступе.
   */
  public findByOffset(limit: number, skip: number) {
    return this.serialModel
      .find(null, null, {
        limit,
        skip,
      })
      .populate({
        path: 'episodes',
        options: {
          sort: {
            date: -1,
          },
          perDocumentLimit: 1,
        },
      });
  }

  /**
   * Возвращает сериал по id.
   */
  public findOne(id: ObjectId) {
    return this.serialModel.findById(id).populate({
      path: 'episodes',
      options: {
        sort: {
          date: -1,
          episode_number: -1,
        },
      },
    });
  }

  /**
   * Обновляет сериал по id.
   */
  public update(id: ObjectId, updateSerialDto: UpdateSerialDto) {
    return this.serialModel.findByIdAndUpdate(id, updateSerialDto, {
      new: true,
    });
  }

  /**
   * Удаляет сериал по id.
   */
  public remove(id: ObjectId) {
    return this.serialModel.findOneAndDelete({ _id: id });
  }

  /**
   * Добавляет id эпизодов.
   */
  public addEpisodesId(id: ObjectId, episodesId: ObjectId[]) {
    return this.serialModel
      .findByIdAndUpdate(
        id,
        {
          $push: {
            episodes: {
              $each: episodesId,
            },
          },
        },
        { new: true },
      )
      .populate('episodes');
  }

  /**
   * Удаляет id эпизода.
   */
  public removeEpisodeId(serialId: ObjectId, episodesId: ObjectId[]) {
    return this.serialModel
      .findByIdAndUpdate(
        serialId,
        {
          $pull: {
            episodes: {
              $in: episodesId,
            },
          },
        },
        { new: true },
      )
      .populate('episodes');
  }
}
