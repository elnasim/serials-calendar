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
}
