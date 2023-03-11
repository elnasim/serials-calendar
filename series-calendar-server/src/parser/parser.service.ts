import { Injectable } from '@nestjs/common';
import { SerialsService } from 'src/serials/serials.service';
import { EpisodesService } from 'src/episodes/episodes.service';
import { ParserHelper } from 'src/parser/helpers/ParserHelper';

@Injectable()
export class ParserService {
  constructor(
    private readonly episodesService: EpisodesService,
    private readonly serialsService: SerialsService,
  ) {}

  public async parseById(id: string) {
    const res = await fetch(process.env.PARSE_URL + id);
    const html = await res.text();

    const parser = new ParserHelper(html);
    parser.parseSerialData();

    const createdSerial = await this.serialsService.create(parser.getSerial);

    // @ts-ignore
    parser.setSerialId(createdSerial._id);

    parser.parseEpisodesData();

    return this.episodesService.create(parser.getSerialId, parser.getEpisodes);
  }
}
