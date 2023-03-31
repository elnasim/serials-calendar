<template>
  <router-link
    to=""
    class="mb-4 grid grid-cols-[2fr_14fr_1fr] bg-color-2 rounded-md overflow-hidden"
  >
    <img
      :src="`http://localhost:9090/serials/${serial._id}.jpg`"
      class="h-full w-full"
      alt=""
    />

    <div class="p-2 text-[white] flex items-center justify-center">
      <div class="font-bold text-2xl">{{ serial.title }}</div>

      <!--      <div>Последняя серия: 01-01-2099</div>-->

      <!--      <div>Дата окончания сезона: Неизвестно</div>-->
    </div>

    <button @click="favoriteToggle(serial._id)" class="bg-color-5">
      <span class="material-symbols-rounded text-red" style="font-size: 40px">
        favorite
      </span>
    </button>
  </router-link>
</template>

<script setup lang="ts">
import type { ISerial } from "@/modules/serials/types";
import { serialsService } from "@/modules/serials/SerialsService";

defineProps<{
  serial: ISerial;
  favoriteToggle: (serialId: string) => {};
}>();
</script>
