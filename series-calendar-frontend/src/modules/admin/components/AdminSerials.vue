<template>
  <h1 class="text-[white] text-[30px] mb-[30px]">Список сериалов</h1>

  <div class="mb-4 grid grid-cols-2 gap-4">
    <button
      @click="filter = FilterEnum.ALL"
      class="text-[white] p-2 bg-color-3"
    >
      Без фильтра
    </button>

    <button
      @click="filter = FilterEnum.WITHSEASONENDDATE"
      class="text-[white] p-2 bg-color-3"
    >
      Дата окончания сезона неизвестна
    </button>
  </div>

  <div class="grid grid-cols-1 gap-3">
    <template v-for="serial in serials" :key="serial._id">
      <router-link
        :to="`/admin/serials/${serial._id}`"
        class="grid grid-cols-[1fr_14fr] bg-color-2"
        v-if="
          filter === FilterEnum.ALL ||
          (filter === FilterEnum.WITHSEASONENDDATE &&
            !serial.episodes[0]?.is_last_season_episode)
        "
      >
        <img
          :src="`${VITE_CDN_URL}/serials/${serial._id}.jpg`"
          class="h-full w-full"
          alt=""
        />

        <div class="p-2 text-[white]">
          <div class="mb-2 font-bold">{{ serial.title }}</div>

          <div>
            Последняя серия:
            {{ dateHelper.getDMYDate(serial.episodes[0]?.date) }}
          </div>

          <div>
            Дата окончания сезона:
            <b>{{ serial.episodes[0]?.is_last_season_episode }}</b>
          </div>
        </div>
      </router-link>
    </template>
  </div>

  <router-link
    class="bg-[white] p-2 mt-[30px] inline-block w-full text-center uppercase font-bold"
    :to="routes.adminSerialCreatePage()"
  >
    Добавить сериал
  </router-link>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import serialsService from "@/modules/admin/services/SerialsService";
import type { ISerialWithEpisodes } from "@/modules/admin/types";
import dateHelper from "@/modules/common/helpers/DateHelper";
import routes from "@/router/Routes";
import {
  ToastTypesEnum,
  useToast,
} from "@/modules/common/components/Toast/useToast";
import type { AxiosError } from "axios";

const VITE_CDN_URL = import.meta.env.VITE_CDN_URL;

enum FilterEnum {
  ALL = "ALL",
  WITHSEASONENDDATE = "WITHSEASONENDDATE",
}

const { showToast } = useToast();

const serials = ref<ISerialWithEpisodes[]>();
const filter = ref<FilterEnum>(FilterEnum.ALL);

onMounted(() => {
  getAllSerials();
});

async function getAllSerials() {
  try {
    serials.value = await serialsService.getAllSerials();
  } catch (e) {
    const error = e as AxiosError<{ message: string; statusCode: number }>;
    showToast(error.response?.data.message, ToastTypesEnum.ERROR);
  }
}
</script>
