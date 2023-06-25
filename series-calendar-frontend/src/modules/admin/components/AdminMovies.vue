<template>
  <h1 class="text-[white] text-[30px] mb-[30px]">Список фильмов</h1>

  <router-link
    class="bg-[white] mb-6 p-2 mt-[30px] inline-block w-full text-center uppercase font-bold"
    :to="routes.adminMovieCreatePage()"
  >
    Добавить фильм
  </router-link>

  <div class="grid grid-cols-1 gap-3">
    <template v-for="movie in movies" :key="movie._id">
      <router-link
        :to="`/admin/movies/${movie._id}`"
        class="grid grid-cols-[1fr_14fr] bg-color-2"
      >
        <img
          :src="`${VITE_CDN_URL}/movies/${movie._id}.jpg`"
          class="h-full w-full"
          alt=""
        />

        <div class="p-2 text-[white]">
          <div class="mb-2 font-bold">{{ movie.title }}</div>

          <div>
            Дата:
            {{ dateHelper.getDMYDate(movie.digital_date) }}
          </div>
        </div>
      </router-link>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import type { IMovie } from "@/modules/admin/types";
import dateHelper from "@/modules/common/helpers/DateHelper";
import { routes } from "@/router/Routes";
import {
  ToastTypesEnum,
  useToast,
} from "@/modules/common/components/Toast/useToast";
import type { AxiosError } from "axios";
import moviesService from "@/modules/admin/services/MoviesService";

const VITE_CDN_URL = import.meta.env.VITE_CDN_URL;

const { showToast } = useToast();

const movies = ref<IMovie[]>();

onMounted(() => {
  getAllMovies();
});

async function getAllMovies() {
  try {
    movies.value = await moviesService.getAllMovies();
  } catch (e) {
    const error = e as AxiosError<{ message: string; statusCode: number }>;
    showToast(error.response?.data.message, ToastTypesEnum.ERROR);
  }
}
</script>
