<template>
  <div class="w-full flex justify-center items-center mb-12">
    <button
      class="outline-none bg-color-5 text-color-1 rounded-full w-8 h-8 text-lg cursor-pointer select-none"
      @click="prevMonth"
    >
      ←
    </button>
    <div
      class="text-color-5 font-bold text-2xl ml-12 mr-12 w-56 text-center select-none"
    >
      {{ currentCalendarMonth }} | {{ currentCalendarYear }}
    </div>
    <button
      class="outline-none bg-color-5 text-color-1 rounded-full w-8 h-8 text-lg cursor-pointer select-none"
      @click="nextMonth"
    >
      →
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useCalendar } from "@/modules/calendar/composable/useCalendar";

const { prevMonth, nextMonth, currentCalendarMonth, currentCalendarYear } =
  useCalendar();
</script>
