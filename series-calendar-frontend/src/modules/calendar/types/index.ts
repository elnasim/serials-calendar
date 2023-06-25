export type TCalendar = TDay[];
export type TCalendarMovies = TDayMovies[];

export type TDay = IDay | null;
export type TDayMovies = IDayMovies | null;

export interface IDay {
  dayInfo: IDayInfo;
  content: Array<ISerialEpisodeWithSerialInfo> | null;
}

export interface IDayMovies {
  dayInfo: IDayInfo;
  content: Array<IMovie> | null;
}

export interface IDayInfo {
  dayIndex: number;
}

export interface ISerialEpisodeWithSerialInfo {
  _id: string;
  title: string;
  date: Date;
  is_last_season_episode: boolean;
  season: number;
  episode_number: number;
  serial: {
    _id: string;
    title: string;
    img: string;
    imdb: number;
  };
}

export enum MonthsEnum {
  "January" = "January",
  "February" = "February",
  "March" = "March",
  "April" = "April",
  "May" = "May",
  "June" = "June",
  "July" = "July",
  "August" = "August",
  "September" = "September",
  "October" = "October",
  "November" = "November",
  "December" = "December",
}

export enum EpisodesShowTypeEnum {
  "ALL_EPISODES" = "ALL_EPISODES",
  "LAST_EPISODES" = "LAST_EPISODES",
}

export enum SerialsShowTypeEnum {
  "ALL_SERIALS" = "ALL_SERIALS",
  "FAVORITE_SERIALS" = "FAVORITE_SERIALS",
}

export interface IMovie {
  _id: string;
  title: string;
  digital_date: Date;
}
