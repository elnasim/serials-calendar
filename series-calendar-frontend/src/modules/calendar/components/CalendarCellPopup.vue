<template>
  <div class="bg-color-2 p-2 rounded-md max-w-[500px]">
    <div
      v-for="(serial, title) in dayData"
      :key="title"
      :style="`background-image: url(${CDN_URL}/serials/${serial[0].serial._id}.jpg)`"
      class="relative rounded-md overflow-hidden py-2 px-4 bg-cover bg-center mb-2 last:mb-0"
    >
      <div class="relative z-[1] text-2xl text-[white] mb-2">{{ title }}</div>

      <div
        v-for="episode of serial"
        :key="episode._id"
        class="text-[#FFFFFF] relative z-[1]"
      >
        <div>
          Сезон {{ episode.season }} | Серия {{ episode.episode_number }}
        </div>
      </div>

      <div class="absolute inset-0 bg-[black]/80"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISerialEpisodeWithSerialInfo } from "@/modules/calendar/types";

defineProps<{
  dayData: { [title: string]: ISerialEpisodeWithSerialInfo[] };
}>();

const CDN_URL = import.meta.env.VITE_CDN_URL;
</script>
