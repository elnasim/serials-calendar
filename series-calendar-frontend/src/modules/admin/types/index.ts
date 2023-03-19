export interface ISerial {
  _id: string;
  title: string;
}

export interface ISerialCreate {
  title: string;
  img: string;
}

export interface ISerialWithEpisodes {
  _id: string;
  title: string;
  episodes: IEpisode[];
}

export interface IEpisode {
  _id: string;
  title: string;
  date: string;
  season: number;
  episode_number: number;
  is_last_season_episode: boolean;
}

export interface IEpisodeUpdate {
  title: string;
  date: string;
  season: number;
  episode_number: number;
  is_last_season_episode: boolean;
}

export interface INewEpisode {
  title: string;
  date: string;
  season: number;
  episode_number: number;
  serial: string;
  is_last_season_episode: boolean;
}
