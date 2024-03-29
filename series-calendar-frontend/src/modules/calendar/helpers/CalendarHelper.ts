import type { ISerialEpisodeWithSerialInfo, TCalendar } from "../types";
import DateHelper from "@/modules/common/helpers/DateHelper";
import type { MonthsEnum } from "../types";

export default class CalendarHelper {
  private _calendarStructure: TCalendar = [];
  private readonly _month: MonthsEnum;
  private readonly _year: number;
  private _content: ISerialEpisodeWithSerialInfo[];
  private _structure: TCalendar = [];

  constructor({
    month,
    year,
    content,
  }: {
    month: MonthsEnum;
    year: number;
    content: ISerialEpisodeWithSerialInfo[];
  }) {
    this._month = month;
    this._year = year;
    this._content = content;
  }

  private calendarGenerate() {
    this._structure.forEach((day) => {
      if (!day) {
        this._calendarStructure.push(null);
      } else {
        const dayContent = this._content.filter((item) => {
          const date = new Date(item.date);
          const day1 = date.getDate();
          return day.dayInfo.dayIndex === day1;
        });

        this._calendarStructure.push({
          dayInfo: { dayIndex: day.dayInfo.dayIndex },
          content: dayContent,
        });
      }
    });
  }

  private generateStructure() {
    for (
      let offset = 0;
      offset < DateHelper.getDaysOffset(this._month, this._year);
      offset++
    ) {
      this._structure.push(null);
    }

    for (
      let day = 1;
      day <= DateHelper.getDaysInMonth(this._month, this._year);
      day++
    ) {
      this._structure.push({ content: null, dayInfo: { dayIndex: day } });
    }
  }

  public getCalendar(): TCalendar {
    this.generateStructure();
    this.calendarGenerate();

    return this._calendarStructure;
  }
}
