import { computed, ref } from "vue";
import router from "@/router";
import routes from "@/router/Routes";
import Routes from "@/router/Routes";
import dateHelper from "@/modules/common/helpers/DateHelper";
import calendarService from "@/modules/calendar/services/CalendarService";
import type {
  ISerialEpisodeWithSerialInfo,
  MonthsEnum,
} from "@/modules/calendar/types";
import type { TCalendar } from "@/modules/calendar/types";

export function useCalendar() {
  const calendarData = ref<TCalendar>();

  const currentCalendarMonth = computed((): MonthsEnum => {
    return router.currentRoute.value.query.month as MonthsEnum;
  });

  const currentCalendarYear = computed((): number => {
    // @ts-ignore
    return +router.currentRoute.value.query.year;
  });

  const currentCalendarDate = computed(() => {
    return new Date(
      currentCalendarYear.value,
      dateHelper.getMonthIndex(currentCalendarMonth.value)
    );
  });

  const userDate = new Date();
  const isShowOnlyLastEpisodes = ref(false);

  async function fetchCalendarData(): Promise<
    ISerialEpisodeWithSerialInfo[] | null
  > {
    try {
      return await calendarService.getSerialsByMonthAndYear(
        currentCalendarMonth.value,
        currentCalendarYear.value
      );
    } catch (error) {
      console.log("-->", error);
      return null;
    }
  }

  function prevMonth() {
    const newDate = new Date(
      currentCalendarYear.value,
      dateHelper.getMonthIndex(currentCalendarMonth.value) - 1
    );

    return router.push(
      routes.calendarPageWithQueryParams(
        dateHelper.getMonthNameByIndex(newDate.getMonth()),
        newDate.getFullYear()
      )
    );
  }
  function nextMonth() {
    const newDate = new Date(
      currentCalendarYear.value,
      dateHelper.getMonthIndex(currentCalendarMonth.value) + 1
    );

    return router.push(
      routes.calendarPageWithQueryParams(
        dateHelper.getMonthNameByIndex(newDate.getMonth()),
        newDate.getFullYear()
      )
    );
  }

  function toggleIsShowOnlyLastEpisodes() {
    isShowOnlyLastEpisodes.value = !isShowOnlyLastEpisodes.value;
  }

  function setCurrentUserDate() {
    return router.push(
      Routes.calendarPageWithQueryParams(
        dateHelper.getMonthNameByIndex(userDate.getMonth()),
        userDate.getFullYear()
      )
    );
  }

  return {
    calendarData,
    prevMonth,
    nextMonth,
    isShowOnlyLastEpisodes,
    userDate,
    currentCalendarMonth,
    currentCalendarYear,
    toggleIsShowOnlyLastEpisodes,
    setCurrentUserDate,
    fetchCalendarData,
    currentCalendarDate,
  };
}
