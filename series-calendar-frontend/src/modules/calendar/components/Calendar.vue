<template>
  <div class="container flex flex-wrap" v-if="calendarData">
    <button
      class="mx-auto max-w-[260px] w-full bg-color-4 rounded-md mb-4"
      @click="toggleIsShowOnlyLastEpisodes"
    >
      {{
        isShowOnlyLastEpisodes
          ? "Показывать только последние эпизоды сезона"
          : "Показывать все эпизоды"
      }}
    </button>

    <button
      @click="setCurrentUserDate"
      class="mx-auto max-w-[260px] w-full bg-color-4 rounded-md mb-4"
    >
      На сегодня
    </button>

    <CalendarControl />

    <div class="w-full grid grid-cols-7 mb-6">
      <div class="text-center text-color-4">ПН</div>
      <div class="text-center text-color-4">ВТ</div>
      <div class="text-center text-color-4">СР</div>
      <div class="text-center text-color-4">ЧТ</div>
      <div class="text-center text-color-4">ПТ</div>
      <div class="text-center text-color-4">СБ</div>
      <div class="text-center text-color-4">ВС</div>
    </div>

    <div class="w-full grid grid-cols-7">
      <CalendarCell
        class="calendar-grid-cell"
        v-for="day of calendarData"
        :key="day?.dayInfo.dayIndex"
        :dayData="day"
        :isShowOnlyLastEpisodes="isShowOnlyLastEpisodes"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watch } from "vue";
import { useCalendar } from "@/modules/calendar/composable/useCalendar";
import CalendarControl from "@/modules/calendar/components/CalendarControl.vue";
import CalendarCell from "@/modules/calendar/components/CalendarCell.vue";
import CalendarHelper from "@/modules/calendar/helpers/CalendarHelper";

const {
  calendarData,
  toggleIsShowOnlyLastEpisodes,
  isShowOnlyLastEpisodes,
  setCurrentUserDate,
  currentCalendarMonth,
  fetchCalendarData,
  currentCalendarDate,
} = useCalendar();

watch(
  () => currentCalendarMonth.value,
  async () => {
    const data = await fetchCalendarData();

    if (data) {
      const calendar = new CalendarHelper(currentCalendarDate.value, data);
      calendarData.value = calendar.getCalendar();
    }
  },
  { immediate: true }
);
</script>
