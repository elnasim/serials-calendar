<template>
  <div class="w-full bg-color-2 p-2">
    <div
      v-for="(serial, title) in serializeData"
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
import { ISerialEpisodeWithSerialInfo, TDay } from "@/modules/calendar/types";
import { computed } from "vue";

const props = defineProps<{
  dayData: TDay;
}>();

const CDN_URL = import.meta.env.VITE_CDN_URL;

const serializeData = computed(() => {
  const obj: { [title: string]: ISerialEpisodeWithSerialInfo[] } = {};

  props.dayData?.content?.forEach((el) => {
    const serialId = el.serial.title;

    if (!obj[serialId]) {
      obj[serialId] = [];
    }

    obj[serialId].push(el);
  });

  return obj;
});
</script>
