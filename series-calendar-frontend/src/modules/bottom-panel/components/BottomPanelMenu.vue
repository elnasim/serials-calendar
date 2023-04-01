<template>
  <div
    class="absolute bottom-[60px] left-0 right-0 bg-color-2 z-[10] p-2 rounded-md"
  >
    <div class="mb-4 flex items-stretch justify-center p-1 rounded-md">
      <button
        @click="showAllEpisodes"
        class="max-w-[260px] w-full h-auto rounded-md text-[white] p-1 text-[12px] leading-3"
        :class="{
          'bg-color-1':
            calendarStore.showEpisodesType ===
            EpisodesShowTypeEnum.ALL_EPISODES,
        }"
      >
        Все эпизоды
      </button>

      <button
        @click="showLastEpisodes"
        class="max-w-[260px] w-full h-auto rounded-md text-[white] p-1 text-[12px] leading-3"
        :class="{
          'bg-color-1':
            calendarStore.showEpisodesType ===
            EpisodesShowTypeEnum.LAST_EPISODES,
        }"
      >
        Последние эпизоды
      </button>
    </div>

    <!--    <div class="mb-4 flex items-stretch justify-center p-1 rounded-md">-->
    <!--      <button-->
    <!--        @click="showAllSerials"-->
    <!--        class="max-w-[260px] w-full h-auto rounded-md text-[white] p-1 text-[12px] leading-3"-->
    <!--        :class="{-->
    <!--          'bg-color-1': showSerialsType === SerialsShowEnum.ALL_SERIALS,-->
    <!--        }"-->
    <!--      >-->
    <!--        Все эпизоды-->
    <!--      </button>-->

    <!--      <button-->
    <!--        @click="showFavoriteSerials"-->
    <!--        class="max-w-[260px] w-full h-auto rounded-md text-[white] p-1 text-[12px] leading-3"-->
    <!--        :class="{-->
    <!--          'bg-color-1': showSerialsType === SerialsShowEnum.FAVORITE_SERIALS,-->
    <!--        }"-->
    <!--      >-->
    <!--        Последние эпизоды-->
    <!--      </button>-->
    <!--    </div>-->

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
import { EpisodesShowTypeEnum } from "@/modules/calendar/types";

const { showLastEpisodes, showAllEpisodes, expandCalendarToggle } =
  useCalendarStore();

const calendarStore = useCalendarStore();
</script>
