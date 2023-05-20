import { defineStore } from "pinia";
import { routes } from "@/router/Routes";
import router from "@/router";
import dateHelper from "@/modules/common/helpers/DateHelper";
import calendarService from "@/modules/calendar/services/CalendarService";
import type {
  ISerialEpisodeWithSerialInfo,
  TCalendar,
} from "@/modules/calendar/types";
import { MonthsEnum } from "@/modules/calendar/types";
import CalendarHelper from "@/modules/calendar/helpers/CalendarHelper";

interface ICalendarState {
  isShowOnlyLastEpisodes: boolean;
  isShowOnlyFavoriteSerials: boolean;
  isExpandCalendar: boolean;
  calendarData: TCalendar;
  userDate: Date;
  currentCalendarMonth: MonthsEnum;
  currentCalendarYear: number;
}

export const useCalendarStore = defineStore("calendar", {
  state: (): ICalendarState => ({
    isShowOnlyLastEpisodes: false,
    isShowOnlyFavoriteSerials: false,
    isExpandCalendar: false,
    calendarData: [],
    userDate: new Date(),
    currentCalendarMonth: MonthsEnum.January,
    currentCalendarYear: 1970,
  }),

  getters: {},

  actions: {
    async fetchCalendarData(): Promise<ISerialEpisodeWithSerialInfo[] | null> {
      try {
        return await calendarService.getEpisodesWithFilter({
          month: this.currentCalendarMonth,
          year: this.currentCalendarYear,
          isShowOnlyLastEpisodes: this.isShowOnlyLastEpisodes,
          isShowOnlyFavoriteSerials: this.isShowOnlyFavoriteSerials,
        });
      } catch (error) {
        console.log("-->", error);
        return null;
      }
    },

    async generateCalendar() {
      const content = await this.fetchCalendarData();

      if (content) {
        const calendar = new CalendarHelper({
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

    showAllEpisodes() {
      this.isShowOnlyLastEpisodes = false;
    },

    showLastEpisodes() {
      this.isShowOnlyLastEpisodes = true;
    },

    showAllSerials() {
      this.isShowOnlyFavoriteSerials = false;
    },

    showFavoriteSerials() {
      this.isShowOnlyFavoriteSerials = true;
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
