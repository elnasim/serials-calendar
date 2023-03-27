import { computed, ref } from "vue";
import router from "@/router";
import { routes } from "@/router/Routes";
import dateHelper from "@/modules/common/helpers/DateHelper";
import calendarService from "@/modules/calendar/services/CalendarService";
import type {
  ISerialEpisodeWithSerialInfo,
  MonthsEnum,
} from "@/modules/calendar/types";
import type { TCalendar } from "@/modules/calendar/types";

export enum EpisodesShowTypeEnum {
  "ALL_EPISODES" = "ALL_EPISODES",
  "LAST_EPISODES" = "LAST_EPISODES",
}

const showEpisodesType = ref<EpisodesShowTypeEnum>(
  EpisodesShowTypeEnum.ALL_EPISODES
);
const isExpandCalendar = ref(false);

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

  async function fetchCalendarData(): Promise<
    ISerialEpisodeWithSerialInfo[] | null
  > {
    try {
      if (showEpisodesType.value === EpisodesShowTypeEnum.ALL_EPISODES) {
        return await calendarService.getEpisodesByMonthAndYear(
          currentCalendarMonth.value,
          currentCalendarYear.value
        );
      }

      if (showEpisodesType.value === EpisodesShowTypeEnum.LAST_EPISODES) {
        return await calendarService.getLastEpisodesByMonthAndYear(
          currentCalendarMonth.value,
          currentCalendarYear.value
        );
      }

      return null;
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

  function setCurrentUserDate() {
    return router.push(
      routes.calendarPageWithQueryParams(
        dateHelper.getMonthNameByIndex(userDate.getMonth()),
        userDate.getFullYear()
      )
    );
  }

  function showAllEpisodes() {
    showEpisodesType.value = EpisodesShowTypeEnum.ALL_EPISODES;
  }

  function showLastEpisodes() {
    showEpisodesType.value = EpisodesShowTypeEnum.LAST_EPISODES;
  }

  function expandCalendarToggle() {
    isExpandCalendar.value = !isExpandCalendar.value;
  }

  return {
    calendarData,
    prevMonth,
    nextMonth,
    userDate,
    currentCalendarMonth,
    currentCalendarYear,
    setCurrentUserDate,
    fetchCalendarData,
    currentCalendarDate,
    showEpisodesType,
    showAllEpisodes,
    showLastEpisodes,
    isExpandCalendar,
    expandCalendarToggle,
  };
}
