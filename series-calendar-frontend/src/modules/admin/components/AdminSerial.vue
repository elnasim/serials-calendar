<template>
  <h1 class="text-[white] text-[30px] mb-[30px]">
    <router-link :to="routes.adminSerialsPage()">
      <span class="material-symbols-rounded text-[20px]">arrow_back</span>
      Редактирование сериала
    </router-link>
  </h1>

  <div class="mb-6">
    <form
      @submit.prevent="updateSerialTitleHandler"
      class="grid grid-cols-2 items-stretch mb-4"
    >
      <input
        type="text"
        class="block w-full p-2 border-r-2 border-r-color-1 text-[20px]"
        v-model="title"
      />

      <AdminButton text="Обновить" class="uppercase font-bold text-[20px]" />
    </form>

    <div class="grid grid-cols-[1fr_4fr] items-center gap-x-4">
      <img
        :src="`${VITE_CDN_URL}/serials/${
          router.currentRoute.value.params.id
        }.jpg?${Date.now()}`"
        class="w-full max-w-[200px] block"
        alt=""
      />

      <div>
        <input
          type="file"
          @change="(e) => posterChangeHandler(e)"
          accept="image/jpeg"
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

  <div class="text-[white] mb-[30px] text-[30px]">Список эпизодов</div>

  <div class="grid grid-cols-3 gap-10 mb-10">
    <div v-for="episode of episodes" :key="episode._id" class="">
      <div class="flex items-center justify-between bg-color-5 mb-2 p-2">
        <div class="w-full">
          <label>
            <span>Сезон</span>
            <input
              class="block w-full p-2 mb-2"
              type="number"
              v-model="episode.season"
            />
          </label>

          <label>
            <span>Номер эпизода</span>
            <input
              class="block w-full p-2 mb-2"
              type="number"
              v-model="episode.episode_number"
            />
          </label>

          <input class="block w-full p-2" type="date" v-model="episode.date" />
        </div>
        <div class="p-2">
          <label class="mb-2 block flex items-center">
            <input
              type="checkbox"
              v-model="episodesToDeleteHandler"
              :value="episode._id"
            />
            <span>Отметка для удаления</span>
          </label>

          <label class="flex items-center">
            <input type="checkbox" v-model="episode.is_last_season_episode" />
            Последний эпизод сезона
          </label>
        </div>
      </div>

      <AdminButton
        text="Обновить"
        @click="
          updateEpisode(episode._id, {
            title: episode.title,
            date: episode.date,
            season: episode.season,
            episode_number: episode.episode_number,
            is_last_season_episode: episode.is_last_season_episode,
          })
        "
        class="w-full font-bold uppercase"
      />
    </div>
  </div>

  <AdminButton
    v-if="episodesToDelete.length > 0"
    @click="removeEpisodes"
    class="mb-10 w-full font-bold uppercase bg-red"
    text="Массовое удаление"
  />

  <AdminButton
    @click="showAddEpisodesPopup"
    text="Добавить эпизоды"
    class="w-full font-bold uppercase"
  />

  <Popup v-model="isShowAddEpisodesPopup">
    <div class="flex justify-center">
      <form
        class="p-4 bg-color-2 overflow-y-auto max-h-screen w-full max-w-[600px]"
        @submit.prevent="addEpisodes"
      >
        <div
          v-for="(episode, index) in newEpisodes"
          :key="index"
          class="pb-4 mb-4 border-b-2 border-b-color-3"
        >
          <label>
            <span class="text-[white]">Дата</span>
            <input
              class="block p-2 mb-2 w-full"
              type="date"
              placeholder="Дата выхода"
              v-model="episode.date"
              required
            />
          </label>

          <label>
            <span class="text-[white]">Сезон</span>
            <input
              class="block p-2 mb-2 w-full"
              type="text"
              placeholder="Сезон"
              v-model="episode.season"
              required
            />
          </label>

          <label>
            <span class="text-[white]">Эпизод</span>
            <input
              class="block p-2 mb-2 w-full"
              type="text"
              placeholder="Номер эпизода"
              v-model="episode.episode_number"
              required
            />
          </label>
        </div>

        <button
          @click.prevent="addEditedEpisodeHandler"
          class="block p-2 w-full mb-2 bg-color-1 text-[white]"
        >
          Добавить еще один эпизод
        </button>

        <button class="block p-2 w-full bg-color-2 text-[white]">
          Сохранить
        </button>
      </form>
    </div>
  </Popup>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import Popup from "@/modules/common/components/Popup.vue";
import type {
  IEpisode,
  IEpisodeUpdate,
  INewEpisode,
  ISerialWithEpisodes,
} from "@/modules/admin/types";
import serialsService from "@/modules/admin/services/SerialsService";
import episodesService from "@/modules/admin/services/EpisodesService";
import serialize from "@/modules/admin/helpers/Serialize";
import routes from "@/router/Routes";
import AdminButton from "@/modules/admin/components/AdminButton.vue";

const VITE_CDN_URL = import.meta.env.VITE_CDN_URL;

const router = useRouter();

const serial = ref<ISerialWithEpisodes | null>(null);
const title = ref<string>("");
const poster = ref<Blob | null>(null);
const episodes = ref<IEpisode[]>([]);
const newEpisodes = ref<INewEpisode[]>([
  {
    title: "",
    date: "",
    season: 0,
    episode_number: 0,
    is_last_season_episode: false,
    serial: router.currentRoute.value.params.id as string,
  },
]);
const episodesToDelete = ref<string[]>([]);
const isShowAddEpisodesPopup = ref(false);

onMounted(async () => {
  await getSerialById();
  setInitData();
});

const setInitData = () => {
  if (serial.value) {
    title.value = serial.value.title;
    changeEpisodes(serial.value.episodes);
  }
};

const changeEpisodes = (changedEpisodes: IEpisode[]) => {
  episodes.value = serialize.episodes(changedEpisodes);
};

//===========================
// SERIAL
//===========================
const getSerialById = async () => {
  serial.value = await serialsService.getSerialById(
    router.currentRoute.value.params.id as string
  );
};

const updateSerialTitleHandler = async () => {
  await serialsService.updateSerialById({
    title: title.value,
    id: router.currentRoute.value.params.id as string,
  });
};

const posterChangeHandler = (e: any) => {
  poster.value = e.target.files[0];
};

const posterUploadHandler = async () => {
  if (poster.value) {
    await serialsService.uploadPoster({
      poster: poster.value,
      id: router.currentRoute.value.params.id as string,
    });
  }
};

//===========================
// EPISODES
//===========================

// ADD
const addEditedEpisodeHandler = () => {
  newEpisodes.value.push({
    title: "",
    date: "",
    season: 0,
    episode_number: 0,
    serial: router.currentRoute.value.params.id as string,
    is_last_season_episode: false,
  });
};

const addEpisodes = async () => {
  const { episodes } = await episodesService.addEpisodes(
    router.currentRoute.value.params.id as string,
    newEpisodes.value
  );
  clearNewEpisodes();
  hideAddEpisodesPopup();
  changeEpisodes(episodes);
};

const clearNewEpisodes = () => {
  newEpisodes.value = [
    {
      title: "",
      date: "",
      season: 0,
      episode_number: 0,
      serial: router.currentRoute.value.params.id as string,
      is_last_season_episode: false,
    },
  ];
};

// UPDATE
const updateEpisode = async (id: string, episode: IEpisodeUpdate) => {
  await episodesService.updateEpisode(id, episode);
};

// REMOVE
const episodesToDeleteHandler = computed({
  get() {
    return episodesToDelete.value;
  },

  set() {
    // @ts-ignore
    if (event && event.target && event.target.value) {
      // @ts-ignore
      if (!episodesToDelete.value.includes(event.target.value)) {
        // @ts-ignore
        episodesToDelete.value.push(event.target.value);
      } else {
        episodesToDelete.value = episodesToDelete.value.filter(
          // @ts-ignore
          (n) => n !== event.target.value
        );
      }
    }
  },
});

const removeEpisodes = async () => {
  if (serial.value && episodesToDelete.value.length > 0) {
    const { episodes } = await episodesService.removeEpisodes(
      router.currentRoute.value.params.id as string,
      episodesToDelete.value
    );

    changeEpisodes(episodes);
    episodesToDelete.value = [];
  }
};

// POPUP
const showAddEpisodesPopup = () => {
  isShowAddEpisodesPopup.value = true;
};

const hideAddEpisodesPopup = () => {
  isShowAddEpisodesPopup.value = false;
};
</script>
