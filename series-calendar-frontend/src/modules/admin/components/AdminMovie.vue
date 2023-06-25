<template>
  <h1 class="text-[white] text-[30px] mb-[30px]">
    <router-link :to="routes.adminMoviesPage()">
      <span class="material-symbols-rounded text-[20px]">arrow_back</span>
      Список фильмов
    </router-link>
  </h1>

  <div class="mb-6">
    <form
      @submit.prevent="updateTitleHandler"
      class="grid grid-cols-2 items-stretch mb-4"
    >
      <input
        type="text"
        class="block w-full p-2 border-r-2 border-r-color-1 text-[20px]"
        v-model="title"
      />

      <input
        type="date"
        class="block w-full p-2 border-r-2 border-r-color-1 text-[20px]"
        v-model="digital_date"
      />

      <AdminButton text="Обновить" class="uppercase font-bold text-[20px]" />
    </form>

    <div class="grid grid-cols-[1fr_4fr] items-center gap-x-4">
      <img
        :src="`${VITE_CDN_URL}/movies/${
          router.currentRoute.value.params.id
        }.jpg?${Date.now()}`"
        class="w-full max-w-[200px] block"
        alt=""
      />

      <div>
        <input
          type="file"
          @change="(e) => posterChangeHandler(e)"
          class="text-[white] block mb-2"
        />

        <AdminButton
          @click="posterUploadHandler"
          text="Обновить"
          class="uppercase font-bold"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import type { IMovie } from "@/modules/admin/types";
import { routes } from "@/router/Routes";
import AdminButton from "@/modules/admin/components/AdminButton.vue";
import moviesService from "@/modules/admin/services/MoviesService";

const VITE_CDN_URL = import.meta.env.VITE_CDN_URL;

const router = useRouter();

const movie = ref<IMovie | null>(null);
const title = ref<string>("");
const poster = ref<Blob | null>(null);
const digital_date = ref<Date>(new Date());

onMounted(async () => {
  await getMovieById();
  setInitData();
});

const getMovieById = async () => {
  movie.value = await moviesService.getMovieById(
    router.currentRoute.value.params.id as string
  );
};

const setInitData = () => {
  if (movie.value && movie.value.title) {
    title.value = movie.value.title;
  }
};

const updateTitleHandler = async () => {
  await moviesService.updateMovieById({
    title: title.value,
    digital_date: digital_date.value,
    id: router.currentRoute.value.params.id as string,
  });
};

const posterChangeHandler = (e: any) => {
  poster.value = e.target.files[0];
};

const posterUploadHandler = async () => {
  if (poster.value) {
    await moviesService.uploadPoster({
      poster: poster.value,
      id: router.currentRoute.value.params.id as string,
    });
  }
};
</script>
