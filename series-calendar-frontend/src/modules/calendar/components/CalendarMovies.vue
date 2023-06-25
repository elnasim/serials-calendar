<template>
  <div
    class="h-full grid grid-rows-[1fr_12fr]"
    v-if="calendarStore.calendarData"
  >
    <CalendarControl />

    <div
      class="grid grid-rows-[1fr_16fr]"
      :style="`width: ${calendarStore.isExpandCalendar ? '700px' : 'auto'}`"
    >
      <div class="w-full grid grid-cols-7">
        <div class="text-center text-color-4">ПН</div>
        <div class="text-center text-color-4">ВТ</div>
        <div class="text-center text-color-4">СР</div>
        <div class="text-center text-color-4">ЧТ</div>
        <div class="text-center text-color-4">ПТ</div>
        <div class="text-center text-color-4">СБ</div>
        <div class="text-center text-color-4">ВС</div>
      </div>

      <div class="grid grid-cols-7 calendar-wrapper">
        <CalendarMovieCell
          class="calendar-grid-cell"
          v-for="day of calendarStore.calendarData"
          :key="day?.dayInfo.dayIndex"
          :dayData="day"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watch } from "vue";
import CalendarControl from "@/modules/calendar/components/CalendarControl.vue";
import CalendarMovieCell from "@/modules/calendar/components/CalendarMovieCell.vue";
import { useWindowSize } from "@vueuse/core";
import { useRouter } from "vue-router";
import type { MonthsEnum } from "@/modules/calendar/types";
import { useCalendarMoviesStore } from "@/modules/calendar/useCalendarMoviesStore";

const MOBILE_VIEW_WIDTH = 640;

const {
  isExpandCalendar,
  generateCalendar,
  setExpandCalendarOff,
  setCurrentCalendarMonth,
  setCurrentCalendarYear,
} = useCalendarMoviesStore();

const calendarStore = useCalendarMoviesStore();

const router = useRouter();

watch(
  [
    router.currentRoute,
  ],
  () => {
    setCurrentCalendarMonth(
      router.currentRoute.value.query.month as MonthsEnum
    );
    setCurrentCalendarYear(Number(router.currentRoute.value.query.year));
    generateCalendar();
  },
  { immediate: true }
);

const { width } = useWindowSize();

watch(width, () => {
  if (width.value > MOBILE_VIEW_WIDTH && isExpandCalendar) {
    setExpandCalendarOff();
  }
});
</script>

<style scoped>
.calendar-wrapper {
  grid-template-rows: repeat(auto-fit, minmax(1px, 1fr));
}
</style>
