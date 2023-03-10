<template>
  <div class="h-36 p-1">
    <div
      class="w-full h-full relative bg-color-2 rounded-2xl overflow-hidden"
      :class="props.dayData.content?.length && 'cursor-pointer'"
      v-if="props.dayData"
    >
      <div
        :class="isCurrentDay && `bg-red`"
        class="absolute top-1 right-1 w-5 h-5 bg-color-1 text-color-5 rounded-full flex justify-center items-center text-xs font-bold z-[1]"
      >
        {{ props.dayData?.dayInfo.dayIndex }}
      </div>

      <div
        class="h-full flex flex-col"
        v-if="dayData?.content && dayData.content.length > 0"
      >
        <div
          v-for="item of dayData?.content"
          :key="item._id"
          :class="
            !isShowOnlyLastEpisodes || item.is_last_season_episode === true
              ? 'w-full h-full'
              : ''
          "
        >
          <div
            v-if="
              !isShowOnlyLastEpisodes || item.is_last_season_episode === true
            "
            class="w-full h-full bg-cover bg-repeat flex items-end p-1 relative mb-0.5 last:mb-0"
            :style="`background-image: url(${VITE_CDN_URL}/serials/${item.serial._id}.jpg);`"
          >
            <div
              class="absolute inset-0 flex items-end p-0.5 bg-gradient-to-t from-color-1 to-transparent"
            >
              <div
                class="flex items-center overflow-hidden truncate text-color-5 text-xs rounded-md pl-1 pr-1"
              >
                <span
                  v-if="item.serial?.imdb && item.serial?.imdb > 0"
                  class="min-w-[6px] w-1.5 h-1.5 rounded-full inline-block mr-1"
                  :class="bgTitleColorByRating(item.serial?.imdb)"
                ></span>
                <span class="truncate">{{ item.serial?.title }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import dateHelper from "@/modules/common/helpers/DateHelper";
import type { TDay } from "@/modules/calendar/types";
import { useCalendar } from "@/modules/calendar/composable/useCalendar";

const VITE_CDN_URL = import.meta.env.VITE_CDN_URL;

const props = defineProps<{
  dayData: TDay;
}>();

const { isShowOnlyLastEpisodes, userDate, currentCalendarMonth } =
  useCalendar();

const isCurrentDay = computed(() => {
  return (
    props.dayData?.dayInfo.dayIndex === userDate.getDate() &&
    dateHelper.getMonthIndex(currentCalendarMonth.value) === userDate.getMonth()
  );
});

const bgTitleColorByRating = (rating: number) => {
  if (rating < 2) {
    return "bg-rating-1";
  }
  if (rating < 4) {
    return "bg-rating-2";
  }
  if (rating < 6) {
    return "bg-rating-3";
  }
  if (rating < 7) {
    return "bg-rating-4";
  }
  if (rating < 8) {
    return "bg-rating-5";
  }
  if (rating < 9) {
    return "bg-rating-6";
  }
  if (rating <= 10) {
    return "bg-rating-7";
  }
};
</script>
