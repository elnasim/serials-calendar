export type TCalendar = TDay[];

export type TDay = IDay | null;

export interface IDay {
  dayInfo: IDayInfo;
  content: Array<ISerialEpisodeWithSerialInfo> | null;
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
