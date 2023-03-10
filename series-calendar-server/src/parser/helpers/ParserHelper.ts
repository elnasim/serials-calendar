import { parse } from 'node-html-parser';
import { CreateSerialDto } from '../../serials/dto/create-serial.dto';
import { CreateEpisodeDto } from '../../episodes/dto/create-episode.dto';
import { ObjectId } from 'mongoose';

export class ParserHelper {
  private _root;
  private _serialId: ObjectId;
  private _serial: CreateSerialDto = { title: '' };
  private _episodes: CreateEpisodeDto[] = [];

  constructor(html: string) {
    this._root = parse(html);
  }

  public setSerialId(id: ObjectId) {
    this._serialId = id;
  }

  get getSerialId() {
    return this._serialId;
  }

  get getSerial(): CreateSerialDto {
    return this._serial;
  }

  get getEpisodes(): CreateEpisodeDto[] {
    return this._episodes;
  }

  public parseSerialData() {
    const a = this._root.querySelector('[type="application/ld+json"]');
    const jsonData = JSON.parse(a.childNodes.toString());

    this._serial.title = jsonData.name;
  }

  public parseEpisodesData() {
    const episodes = this._root.querySelectorAll('[data-episode-id]');

    for (const episode of episodes) {
      const date = episode.getElementsByTagName('time')[0].attrs.datetime;
      const episode_season = episode.getElementsByTagName('a')[0].rawText;
      const episodeSeasonArray = episode_season.split('.');
      const season = +episodeSeasonArray[0];
      const episode_number = +episodeSeasonArray[1];

      this._episodes.push({
        title: `Серия ${episode_number}`,
        // @ts-ignore
        date: new Date(date),
        episode_number,
        season,
        serial: this._serialId,
      });
    }
  }

  private replaceSymbols(value: string): string {
    const symbols = {
      '&Acy;': 'А',
      '&acy;': 'а',
      '&Bcy;': 'Б',
      '&bcy;': 'б',
      '&Vcy;': 'В',
      '&vcy;': 'в',
      '&Gcy;': 'Г',
      '&gcy;': 'г',
      '&Dcy;': 'Д',
      '&dcy;': 'д',
      '&IEcy;': 'Е',
      '&iecy;': 'е',
      '&IOcy;': 'Ё',
      '&iocy;': 'ё',
      '&ZHcy;': 'Ж',
      '&zhcy;': 'ж',
      '&Zcy;': 'З',
      '&zcy;': 'з',
      '&Icy;': 'И',
      '&icy;': 'и',
      '&Jcy;': 'Й',
      '&jcy;': 'й',
      '&Kcy;': 'К',
      '&kcy;': 'к',
      '&Lcy;': 'Л',
      '&lcy;': 'л',
      '&Mcy;': 'М',
      '&mcy;': 'м',
      '&Ncy;': 'Н',
      '&ncy;': 'н',
      '&Ocy;': 'О',
      '&ocy;': 'о',
      '&Pcy;': 'П',
      '&pcy;': 'п',
      '&Rcy;': 'Р',
      '&rcy;': 'р',
      '&Scy;': 'С',
      '&scy;': 'с',
      '&Tcy;': 'Т',
      '&tcy;': 'т',
      '&Ucy;': 'У',
      '&ucy;': 'у',
      '&Fcy;': 'Ф',
      '&fcy;': 'ф',
      '&KHcy;': 'Х',
      '&khcy;': 'х',
      '&TScy;': 'Ц',
      '&tscy;': 'ц',
      '&CHcy;': 'Ч',
      '&chcy;': 'ч',
      '&SHcy;': 'Ш',
      '&shcy;': 'ш',
      '&SHCHcy;': 'Щ',
      '&shchcy;': 'щ',
      '&hardcy;': 'ъ',
      '&Ycy;': 'Ы',
      '&ycy;': 'ы',
      '&softcy;': 'ь',
      '&Ecy;': 'Э',
      '&ecy;': 'э',
      '&YUcy;': 'Ю',
      '&yucy;': 'ю',
      '&YAcy;': 'Я',
      '&yacy;': 'я',
      '&comma;': ',',
      '&colon;': ':',
      '&quest;': '?',
    };

    const valueArr = value.split(';');
    const filtered = valueArr.filter((i) => i !== '');

    filtered.forEach((i, index) => (filtered[index] = symbols[`${i};`]));

    return filtered.join('');
  }
}
