<template>
  <div class="bg-color-2 p-2 rounded-md max-w-[500px]">
    <div
      v-for="(serial, id) in dayData"
      :key="id"
      :style="`background-image: url(${CDN_URL}/serials/${serial[0].serial._id}.jpg)`"
      class="relative rounded-md overflow-hidden py-2 px-4 bg-cover bg-center mb-2 last:mb-0"
    >
      <div class="relative z-[1]">
        <div class="relative text-2xl text-[white] mb-2">
          {{ serial[0].serialTitle }}
        </div>

        <div
          v-for="episode of serial"
          :key="episode._id"
          class="text-[#FFFFFF] relative"
        >
          <div>
            Сезон {{ episode.season }} | Серия {{ episode.episode_number }}
          </div>
        </div>

        <button @click="addToFavorite(id)">
          <span class="material-symbols-rounded" style="color: red">
            favorite
          </span>
        </button>
      </div>

      <div class="absolute inset-0 bg-[black]/80"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ITransformedSerials } from "@/modules/calendar/components/CalendarCell.vue";
import { serialsService } from "@/modules/serials/SerialsService";

defineProps<{
  dayData: { [id: string]: ITransformedSerials[] };
}>();

const CDN_URL = import.meta.env.VITE_CDN_URL;

function addToFavorite(serialId: string) {
  serialsService.addFavoriteSerial(serialId);
}
</script>
