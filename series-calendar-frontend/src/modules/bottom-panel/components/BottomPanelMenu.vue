<template>
  <div
    class="absolute w-[200px] bottom-[60px] bg-color-2 z-[10] p-2 rounded-md shadow-[0_0_60px_-15px_rgba(0,0,0,0.5)]"
  >
    <div class="mb-4 flex items-stretch justify-center p-1 rounded-md">
      <button
        @click="showAllEpisodes"
        class="max-w-[260px] w-full h-auto rounded-md text-[white] p-1 text-[12px] leading-3"
        :class="{
          'bg-color-1': !calendarStore.isShowOnlyLastEpisodes,
        }"
      >
        Все эпизоды
      </button>

      <button
        @click="showLastEpisodes"
        class="max-w-[260px] w-full h-auto rounded-md text-[white] p-1 text-[12px] leading-3"
        :class="{
          'bg-color-1': calendarStore.isShowOnlyLastEpisodes,
        }"
      >
        Последние эпизоды
      </button>
    </div>

    <div class="mb-4 flex items-stretch justify-center p-1 rounded-md">
      <button
        @click="showAllSerials"
        class="max-w-[260px] w-full h-auto rounded-md text-[white] p-1 text-[12px] leading-3"
        :class="{
          'bg-color-1': !calendarStore.isShowOnlyFavoriteSerials,
        }"
      >
        Все сериалы
      </button>

      <button
        @click="showFavoriteSerials"
        class="max-w-[260px] w-full h-auto rounded-md text-[white] p-1 text-[12px] leading-3"
        :class="{
          'bg-color-1': calendarStore.isShowOnlyFavoriteSerials,
        }"
      >
        Избранные сериалы
      </button>
    </div>

    <div>
      <button
        @click="expandCalendarToggle"
        class="w-full bg-color-1 block sm:hidden rounded-full flex items-center justify-center"
      >
        <span class="material-symbols-rounded">width</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCalendarStore } from "@/modules/calendar/useCalendarStore";

const {
  showLastEpisodes,
  showAllEpisodes,
  expandCalendarToggle,
  showAllSerials,
  showFavoriteSerials,
} = useCalendarStore();

const calendarStore = useCalendarStore();
</script>
