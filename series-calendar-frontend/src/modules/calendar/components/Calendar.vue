<template>
  <div class="h-full grid grid-rows-[1fr_12fr]" v-if="calendarData">
    <CalendarControl />

    <div
      class="grid grid-rows-[1fr_16fr]"
      :style="`width: ${isExpandCalendar ? '700px' : 'auto'}`"
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
        <CalendarCell
          class="calendar-grid-cell"
          v-for="day of calendarData"
          :key="day?.dayInfo.dayIndex"
          :dayData="day"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watch, watchEffect } from "vue";
import { useCalendar } from "@/modules/calendar/composable/useCalendar";
import CalendarControl from "@/modules/calendar/components/CalendarControl.vue";
import CalendarCell from "@/modules/calendar/components/CalendarCell.vue";
import CalendarHelper from "@/modules/calendar/helpers/CalendarHelper";
import { useWindowSize } from "@vueuse/core";

const MOBILE_VIEW_WIDTH = 640;

const {
  calendarData,
  fetchCalendarData,
  currentCalendarDate,
  isExpandCalendar,
} = useCalendar();

watchEffect(async () => {
  const data = await fetchCalendarData();

  if (data) {
    const calendar = new CalendarHelper(currentCalendarDate.value, data);
    calendarData.value = calendar.getCalendar();
  }
});

const { width } = useWindowSize();

watch(width, () => {
  if (width.value > MOBILE_VIEW_WIDTH && isExpandCalendar.value === true) {
    isExpandCalendar.value = false;
  }
});
</script>

<style scoped>
.calendar-wrapper {
  grid-template-rows: repeat(auto-fit, minmax(1px, 1fr));
}
</style>
