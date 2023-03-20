<template>
  <h1 class="text-[white] text-[30px] mb-[30px]">Добавление нового сериала</h1>

  <form @submit.prevent="createSerial">
    <input
      type="text"
      class="block mb-2 p-2"
      v-model="title"
      placeholder="title"
      required
    />

    <button class="bg-[white] p-2 mt-[30px] inline-block">
      Добавить сериал
    </button>
  </form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import serialsService from "@/modules/admin/services/SerialsService";
import routes from "@/router/Routes";
import {
  ToastTypesEnum,
  useToast,
} from "@/modules/common/components/Toast/useToast";
import { AxiosError } from "axios";

const title = ref<string>("");

const router = useRouter();
const { showToast } = useToast();

const createSerial = async () => {
  try {
    const data = await serialsService.addSerial({
      title: title.value,
    });

    showToast("Сериал создан");

    await router.push(routes.adminSingleSerialPage(data._id));
  } catch (e) {
    const error = e as AxiosError<{ message: string; statusCode: number }>;
    showToast(error.response?.data.message, ToastTypesEnum.ERROR);
  }
};
</script>
