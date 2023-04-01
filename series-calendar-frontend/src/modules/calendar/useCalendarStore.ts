import { defineStore } from "pinia";
import { routes } from "@/router/Routes";
import router from "@/router";
import dateHelper from "@/modules/common/helpers/DateHelper";
import calendarService from "@/modules/calendar/services/CalendarService";
import type { ISerialEpisodeWithSerialInfo } from "@/modules/calendar/types";
import { EpisodesShowTypeEnum, MonthsEnum } from "@/modules/calendar/types";
import CalendarHelper from "@/modules/calendar/helpers/CalendarHelper";

export const useCalendarStore = defineStore("calendar", {
  state: () => ({
    showEpisodesType: EpisodesShowTypeEnum.ALL_EPISODES,
    isExpandCalendar: false,
    calendarData: null,
    userDate: new Date(),
    currentCalendarMonth: MonthsEnum.January,
    currentCalendarYear: 1970,
  }),

  getters: {},

  actions: {
    async fetchCalendarData(): Promise<ISerialEpisodeWithSerialInfo[] | null> {
      try {
        if (this.showEpisodesType === EpisodesShowTypeEnum.ALL_EPISODES) {
          return await calendarService.getEpisodesByMonthAndYear(
            this.currentCalendarMonth,
            this.currentCalendarYear
          );
        }

        if (this.showEpisodesType === EpisodesShowTypeEnum.LAST_EPISODES) {
          return await calendarService.getLastEpisodesByMonthAndYear(
            this.currentCalendarMonth,
            this.currentCalendarYear
          );
        }

        return null;
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
      this.showEpisodesType = EpisodesShowTypeEnum.ALL_EPISODES;
    },

    showLastEpisodes() {
      this.showEpisodesType = EpisodesShowTypeEnum.LAST_EPISODES;
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
