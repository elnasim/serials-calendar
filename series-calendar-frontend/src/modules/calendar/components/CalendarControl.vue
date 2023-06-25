<template>
  <div class="w-full max-w-[300px] flex justify-between items-center mx-auto">
    <button
      class="flex justify-center items-center bg-color-2 text-color-1 rounded-full w-[40px] min-w-[40px] h-[40px] cursor-pointer"
      @click="prevMonth"
    >
      <span class="material-symbols-rounded text-[white]">arrow_back</span>
    </button>

    <button
      @click="setCurrentUserDate"
      class="text-color-5 font-bold text-2xl ml-12 mr-12 text-center select-none"
    >
      {{ calendarStore.currentCalendarMonth }}
      <br />
      {{ calendarStore.currentCalendarYear }}
    </button>

    <button
      class="flex justify-center items-center bg-color-2 text-color-1 rounded-full w-[40px] min-w-[40px] h-[40px] cursor-pointer"
      @click="nextMonth"
    >
      <span class="material-symbols-rounded text-[white]">arrow_forward</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useCalendarMoviesStore } from "@/modules/calendar/useCalendarMoviesStore";

const { prevMonth, nextMonth, setCurrentUserDate } = useCalendarMoviesStore();

const calendarStore = useCalendarMoviesStore();
</script>
