import type { ISerialEpisodeWithSerialInfo, TCalendar } from "../types";
import DateHelper from "@/modules/common/helpers/DateHelper";

export default class CalendarHelper {
  private _calendarStructure: TCalendar = [];
  private _date: Date;
  private _content: ISerialEpisodeWithSerialInfo[];
  private _structure: TCalendar = [];

  constructor(date: Date, content: ISerialEpisodeWithSerialInfo[]) {
    this._date = date;
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
      offset < DateHelper.getDaysOffset(this._date);
      offset++
    ) {
      this._structure.push(null);
    }

    for (let day = 1; day <= DateHelper.getDaysInMonth(this._date); day++) {
      this._structure.push({ content: null, dayInfo: { dayIndex: day } });
    }
  }

  public getCalendar(): TCalendar {
    this.generateStructure();
    this.calendarGenerate();

    return this._calendarStructure;
  }
}
