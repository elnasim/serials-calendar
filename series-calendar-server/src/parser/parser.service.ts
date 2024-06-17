import { Injectable } from '@nestjs/common';
import { SerialsService } from 'src/serials/serials.service';
import { EpisodesService } from 'src/episodes/episodes.service';
import { ParserHelper } from 'src/parser/helpers/ParserHelper';
import { createWriteStream } from 'fs';
import { get } from 'https';

@Injectable()
export class ParserService {
  constructor(
    private readonly episodesService: EpisodesService,
    private readonly serialsService: SerialsService,
  ) {}

  public async parseById(id: string) {
    const res = await fetch(id);
    const html = await res.text();

    const parser = new ParserHelper(html);
    parser.parseSerialData();

    const createdSerial = await this.serialsService.create(parser.getSerial);

    parser.setSerialId(createdSerial._id);

    parser.parseEpisodesData();

    parser.parsePosterLink();

    const file = createWriteStream(`./files/serials/${createdSerial._id}.jpg`);

    get(parser.getPosterLink, function (response) {
      response.pipe(file);

      file.on('finish', () => {
        file.close();
      });
    });

    return this.episodesService.create(parser.getSerialId, parser.getEpisodes);
  }

  public async parseJSON(json: any) {
    for (const serial of json.serials) {
      const serialTitle = serial.title;
      const season = serial.season;
      const episodes = serial.episodes;
      const startEpisode = serial.start_episode;
      let serialId = null;

      const serialModel = await this.serialsService.findOneByTitle(serialTitle);

      if (!serialModel) {
        const createdSerial = await this.serialsService.create({
          title: serialTitle,
        });
        serialId = createdSerial.id;
        console.log('-->', 'Создан новый сериал');
      } else {
        serialId = serialModel.id;
      }

      const episodesToCreate = episodes.map((episode) => ({
        title: episode.title,
        date: episode.date,
        episode_number: episode.episode_number,
        season,
        is_last_season_episode: false,
        serial: serialId,
      }));

      console.log('-->', JSON.stringify(episodesToCreate));

      // await this.episodesService.create(serialId, episodesToCreate);
    }
  }
}
