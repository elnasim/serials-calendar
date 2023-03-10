import type { IEpisode } from "../types";

class Serialize {
  public episodes(episodes: IEpisode[]): IEpisode[] | [] {
    if (episodes) {
      episodes.forEach((episode) => {
        episode.date = episode.date.slice(0, -14);
      });
      return episodes;
    }
    return [];
  }
}

const serialize = new Serialize();
export default serialize;
