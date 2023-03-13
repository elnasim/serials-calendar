<template>
  <div class="container flex flex-wrap justify-center" v-if="calendarData">
    <div
      class="mb-4 flex items-center justify-center bg-color-3 p-1 rounded-md"
    >
      <button
        @click="showAllEpisodes"
        class="mx-auto max-w-[260px] w-full h-full rounded-md text-[white] p-1"
        :class="{
          'bg-color-2': showEpisodesType === EpisodesShowTypeEnum.ALL_EPISODES,
        }"
      >
        Показывать все эпизоды
      </button>

      <button
        @click="showLastEpisodes"
        class="mx-auto max-w-[260px] w-full h-full rounded-md text-[white] p-1"
        :class="{
          'bg-color-2': showEpisodesType === EpisodesShowTypeEnum.LAST_EPISODES,
        }"
      >
        Показывать последние эпизоды
      </button>
    </div>

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
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watchEffect } from "vue";
import {
  EpisodesShowTypeEnum,
  useCalendar,
} from "@/modules/calendar/composable/useCalendar";
import CalendarControl from "@/modules/calendar/components/CalendarControl.vue";
import CalendarCell from "@/modules/calendar/components/CalendarCell.vue";
import CalendarHelper from "@/modules/calendar/helpers/CalendarHelper";

const {
  calendarData,
  fetchCalendarData,
  currentCalendarDate,
  showEpisodesType,
  showLastEpisodes,
  showAllEpisodes,
} = useCalendar();

watchEffect(async () => {
  const data = await fetchCalendarData();

  if (data) {
    const calendar = new CalendarHelper(currentCalendarDate.value, data);
    calendarData.value = calendar.getCalendar();
  }
});
</script>
