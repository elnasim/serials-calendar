<template>
  <div class="w-full flex justify-center items-center">
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
      {{ calendarStore.currentCalendarMonth }} |
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
import { useCalendarStore } from "@/modules/calendar/useCalendarStore";

const { prevMonth, nextMonth, setCurrentUserDate } = useCalendarStore();

const calendarStore = useCalendarStore();
</script>
