<template>
  <h1 class="text-[white] text-[30px] mb-[30px]">Добавление нового фильма</h1>

  <form @submit.prevent="createMovie">
    <input
      type="text"
      class="block mb-2 p-2"
      v-model="title"
      placeholder="title"
      required
    />

    <button class="bg-[white] p-2 mt-[30px] inline-block">
      Добавить фильм
    </button>
  </form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { routes } from "@/router/Routes";
import {
  ToastTypesEnum,
  useToast,
} from "@/modules/common/components/Toast/useToast";
import type { AxiosError } from "axios";
import moviesService from "@/modules/admin/services/MoviesService";

const title = ref<string>("");

const router = useRouter();
const { showToast } = useToast();

const createMovie = async () => {
  try {
    const data = await moviesService.addMovie({
      title: title.value,
    });

    showToast("Фильм создан");

    await router.push(routes.adminSingleMoviePage(data._id));
  } catch (e) {
    const error = e as AxiosError<{ message: string; statusCode: number }>;
    showToast(error.response?.data.message, ToastTypesEnum.ERROR);
  }
};
</script>
