<template>
  <MainLayout>
    <h1 class="text-[white] text-[30px] mb-[30px]">Список сериалов</h1>

    <div class="flex w-full flex-wrap mx-[-10px]">
      <div
        class="w-1/3 px-[10px] mb-2"
        v-for="serial in serials"
        :key="serial._id"
      >
        <router-link :to="`/admin/serials/${serial._id}`" class="block">
          <span
            class="block w-full aspect-video bg-cover bg-center bg-color-3"
            :style="`background-image: url(${VITE_CDN_URL}/serials/${serial._id}.jpg)`"
          ></span>
          <span class="text-[white]">{{ serial.title }}</span>
        </router-link>
      </div>
    </div>

    <router-link
      class="bg-[white] p-2 mt-[30px] inline-block"
      to="/admin/serials/create"
    >
      Добавить сериал
    </router-link>

    <Toast />
  </MainLayout>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import MainLayout from "@/views/admin/Layouts/MainLayout.vue";
import Toast from "@/modules/common/components/Toast/Toast.vue";
import serialsService from "@/modules/admin/services/SerialsService";
import type { TSerials } from "@/modules/admin/types";

const VITE_CDN_URL = import.meta.env.VITE_CDN_URL;

const serials = ref<TSerials>([]);

onMounted(() => {
  getAllSerials();
});

const getAllSerials = async () => {
  try {
    serials.value = await serialsService.getAllSerials();
  } catch (error) {
    console.log("-->", error);
  }
};
</script>
