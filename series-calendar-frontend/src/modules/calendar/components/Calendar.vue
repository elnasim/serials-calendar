<template>
  <div class="container flex flex-wrap justify-center" v-if="calendarData">
    <div class="w-full flex items-center justify-between">
      <div></div>

      <div
        class="mb-4 flex items-stretch justify-center bg-color-3 p-1 rounded-md"
      >
        <button
          @click="showAllEpisodes"
          class="max-w-[260px] w-full h-auto rounded-md text-[white] p-1 h-full"
          :class="{
            'bg-color-2':
              showEpisodesType === EpisodesShowTypeEnum.ALL_EPISODES,
          }"
        >
          Все эпизоды
        </button>

        <button
          @click="showLastEpisodes"
          class="max-w-[260px] w-full h-auto rounded-md text-[white] p-1"
          :class="{
            'bg-color-2':
              showEpisodesType === EpisodesShowTypeEnum.LAST_EPISODES,
          }"
        >
          Последние эпизоды сезона
        </button>
      </div>

      <div>
        <button
          @click="expandCalendarToggle"
          class="w-[20px] bg-color-3 block sm:hidden rounded-full flex items-center justify-center"
        >
          <span class="material-symbols-rounded">width</span>
        </button>
      </div>
    </div>

    <CalendarControl />

    <div class="w-full overflow-x-scroll">
      <div :style="`width: ${isExpandCalendar ? '700px' : 'auto'}`">
        <div class="w-full grid grid-cols-7 mb-6">
          <div class="text-center text-color-4">ПН</div>
          <div class="text-center text-color-4">ВТ</div>
          <div class="text-center text-color-4">СР</div>
          <div class="text-center text-color-4">ЧТ</div>
          <div class="text-center text-color-4">ПТ</div>
          <div class="text-center text-color-4">СБ</div>
          <div class="text-center text-color-4">ВС</div>
        </div>

        <div class="grid grid-cols-7">
          <CalendarCell
            class="calendar-grid-cell"
            v-for="day of calendarData"
            :key="day?.dayInfo.dayIndex"
            :dayData="day"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, watchEffect } from "vue";
import {
  EpisodesShowTypeEnum,
  useCalendar,
} from "@/modules/calendar/composable/useCalendar";
import CalendarControl from "@/modules/calendar/components/CalendarControl.vue";
import CalendarCell from "@/modules/calendar/components/CalendarCell.vue";
import CalendarHelper from "@/modules/calendar/helpers/CalendarHelper";
import { useWindowSize } from "@vueuse/core";

const MOBILE_VIEW_WIDTH = 640;

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

const isExpandCalendar = ref(false);

function expandCalendarToggle() {
  isExpandCalendar.value = !isExpandCalendar.value;
}

const { width } = useWindowSize();

watch(width, () => {
  if (width.value > MOBILE_VIEW_WIDTH && isExpandCalendar.value === true) {
    isExpandCalendar.value = false;
  }
});
</script>
