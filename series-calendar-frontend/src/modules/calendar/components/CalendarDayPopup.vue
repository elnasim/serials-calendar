<template>
  <div
    class="absolute inset-x-0 top-0 h-full bg-color-1/[.7]"
    @click="closeDayPopup"
  >
    <div class="absolute inset-0 h-screen flex items-center justify-center">
      <div class="max-w-xl p-4 bg-color-1 z-50">
        <div v-for="item of data?.content" :key="item._id">
          <div class="p-2 bg-color-2 mb-2 rounded-md text-color-5">
            {{ item.season }}х{{ item.episode_number }}.
            {{ item.serial.title }} - {{ item.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TDay } from "../types";

defineProps<{
  data: TDay | null | undefined;
  closeDayPopup: () => void;
}>();
</script>
