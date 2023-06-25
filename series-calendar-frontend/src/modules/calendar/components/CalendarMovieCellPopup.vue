<template>
  <div class="bg-color-2 p-2 rounded-md md:w-[500px] w-screen">
    <div
      v-for="movie in dayData.content"
      :key="movie._id"
      :style="`background-image: url(${CDN_URL}/movies/${movie._id}.jpg)`"
      class="relative rounded-md overflow-hidden py-2 px-4 bg-cover bg-center mb-2 last:mb-0"
    >
      <div class="relative z-[1] flex items-center justify-between">
        <div class="relative text-2xl text-[white] mb-2">
          {{ movie.title }}
        </div>
      </div>

      <div class="absolute inset-0 bg-[black]/80"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TDayMovies } from "@/modules/calendar/types";

defineProps<{
  dayData: TDayMovies;
}>();

const CDN_URL = import.meta.env.VITE_CDN_URL;
</script>
