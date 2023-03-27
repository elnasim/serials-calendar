import { MonthsEnum } from "@/modules/calendar/types";

class DateHelper {
  /**
   * Возвращает название месяца по его порядковому номеру.
   */
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

  /**
   * Возвращает порядковый номер месяца, начиная с нуля.
   */
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

  /**
   * Проверяет, является ли год високосным.
   */
  public isLeapYear(year: number): boolean {
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
  }

  /**
   * Возвращает количество дней в месяце.
   */
  public getDaysInMonth(date: Date): number {
    const month = date.getMonth();
    const year = date.getFullYear();

    const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 1 && this.isLeapYear(year)) {
      return 29;
    }

    return months[month];
  }

  /**
   * Возвращает сдвиг количества дней с начала месяца.
   */
  public getDaysOffset(date: Date): number {
    date.setDate(1);
    const startDay = date.getDay();
    return [6, 0, 1, 2, 3, 4, 5][startDay];
  }

  /**
   * Возвращает дату в формате 01-01-2099.
   */
  public getDMYDate(payloadDate: string): string {
    const date = new Date(payloadDate);

    return `${
      date.getDate().toString().length === 2
        ? date.getDate()
        : "0" + date.getDate()
    }-${
      date.getMonth().toString().length === 2
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)
    }-${date.getFullYear()}`;
  }
}

const dateHelper = new DateHelper();
export default dateHelper;
