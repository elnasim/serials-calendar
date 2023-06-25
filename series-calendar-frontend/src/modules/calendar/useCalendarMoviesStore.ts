import { defineStore } from "pinia";
import { routes } from "@/router/Routes";
import router from "@/router";
import dateHelper from "@/modules/common/helpers/DateHelper";
import type { IMovie, TCalendar } from "@/modules/calendar/types";
import { MonthsEnum } from "@/modules/calendar/types";
import calendarMoviesService from "@/modules/calendar/services/CalendarMoviesService";
import CalendarMoviesHelper from "@/modules/calendar/helpers/CalendarMoviesHelper";

interface ICalendarState {
  isExpandCalendar: boolean;
  calendarData: TCalendar;
  userDate: Date;
  currentCalendarMonth: MonthsEnum;
  currentCalendarYear: number;
}

export const useCalendarMoviesStore = defineStore("calendar-movies", {
  state: (): ICalendarState => ({
    isExpandCalendar: false,
    calendarData: [],
    userDate: new Date(),
    currentCalendarMonth: MonthsEnum.January,
    currentCalendarYear: 1970,
  }),

  getters: {},

  actions: {
    async fetchCalendarData(): Promise<IMovie[] | null> {
      try {
        return await calendarMoviesService.getMoviesByMonthAndYear(
          this.currentCalendarMonth,
          this.currentCalendarYear
        );
      } catch (error) {
        console.log("-->", error);
        return null;
      }
    },

    async generateCalendar() {
      const content = await this.fetchCalendarData();

      if (content) {
        const calendar = new CalendarMoviesHelper({
          month: this.currentCalendarMonth,
          year: this.currentCalendarYear,
          content,
        });
        // @ts-ignore
        this.calendarData = calendar.getCalendar();
      }
    },

    prevMonth() {
      const newDate = new Date(
        this.currentCalendarYear,
        dateHelper.getMonthIndex(this.currentCalendarMonth) - 1
      );

      return router.push(
        routes.calendarPageWithQueryParams(
          dateHelper.getMonthNameByIndex(newDate.getMonth()),
          newDate.getFullYear()
        )
      );
    },

    nextMonth() {
      const newDate = new Date(
        this.currentCalendarYear,
        dateHelper.getMonthIndex(this.currentCalendarMonth) + 1
      );

      return router.push(
        routes.calendarPageWithQueryParams(
          dateHelper.getMonthNameByIndex(newDate.getMonth()),
          newDate.getFullYear()
        )
      );
    },

    setCurrentUserDate() {
      return router.push(
        routes.calendarPageWithQueryParams(
          dateHelper.getMonthNameByIndex(this.userDate.getMonth()),
          this.userDate.getFullYear()
        )
      );
    },

    expandCalendarToggle() {
      this.isExpandCalendar = !this.isExpandCalendar;
    },

    setExpandCalendarOn() {
      this.isExpandCalendar = true;
    },

    setExpandCalendarOff() {
      this.isExpandCalendar = false;
    },

    setCurrentCalendarMonth(month: MonthsEnum) {
      this.currentCalendarMonth = month;
    },

    setCurrentCalendarYear(year: number) {
      this.currentCalendarYear = year;
    },
  },
});
