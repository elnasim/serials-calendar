import { MonthsEnum } from "@/modules/calendar/types";

class DateHelper {
  public getMonthNameByIndex(month: number): MonthsEnum {
    const indexByMonth = [
      MonthsEnum.January,
      MonthsEnum.February,
      MonthsEnum.March,
      MonthsEnum.April,
      MonthsEnum.May,
      MonthsEnum.June,
      MonthsEnum.July,
      MonthsEnum.August,
      MonthsEnum.September,
      MonthsEnum.October,
      MonthsEnum.November,
      MonthsEnum.December,
    ];

    return indexByMonth[month];
  }

  public getMonthIndex(month: MonthsEnum): number {
    enum indexByMonth {
      "January" = 0,
      "February" = 1,
      "March" = 2,
      "April" = 3,
      "May" = 4,
      "June" = 5,
      "July" = 6,
      "August" = 7,
      "September" = 8,
      "October" = 9,
      "November" = 10,
      "December" = 11,
    }

    return indexByMonth[month];
  }

  public isLeapYear(year: number): boolean {
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
  }

  public getDaysInMonth(date: Date): number {
    const month = date.getMonth();
    const year = date.getFullYear();

    const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 1 && this.isLeapYear(year)) {
      return 29;
    }

    return months[month];
  }

  public getDaysOffset(date: Date): number {
    date.setDate(1);
    const startDay = date.getDay();
    return [6, 0, 1, 2, 3, 4, 5][startDay];
  }

  public getYMDDate(date: Date): string {
    return `${date.getFullYear()}-${
      date.getMonth().toString().length === 2
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)
    }-${
      date.getDate().toString().length === 2
        ? date.getDate()
        : "0" + date.getDate()
    }`;
  }
}

const dateHelper = new DateHelper();
export default dateHelper;
