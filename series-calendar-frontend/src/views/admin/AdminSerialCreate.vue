<template>
  <MainLayout>
    <h1 class="text-[white] text-[30px] mb-[30px]">
      Добавление нового сериала
    </h1>

    <input type="text" class="block mb-2" v-model="title" placeholder="title" />
    <input type="text" class="block mb-2" v-model="img" placeholder="img" />

    <button
      class="bg-[white] p-2 mt-[30px] inline-block"
      to="/admin/create-serial"
      @click="createSerial"
    >
      Добавить сериал
    </button>
  </MainLayout>
</template>

<script lang="ts" setup>
import serialsService from "@/modules/admin/services/SerialsService";
import { useRouter } from "vue-router";
import MainLayout from "@/views/admin/Layouts/MainLayout.vue";
import { ref } from "vue";

const title = ref<string>("");
const img = ref<string>("");

const router = useRouter();

const createSerial = async () => {
  await serialsService.addSerial({
    title: title.value,
    img: img.value,
  });

  await router.push("/admin/serials");
};
</script>
