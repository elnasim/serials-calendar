<template>
  <MainLayout>
    <h1 class="text-[white] text-[30px] mb-[30px]">Редактирование сериала</h1>

    <div class="mb-6">
      <input type="text" class="block w-full p-2" v-model="title" />
      <button
        @click="updateSerialTitleHandler"
        class="bg-[white] p-2 mt-[10px] inline-block mb-6"
      >
        Обновить
      </button>

      <img
        :src="`${VITE_CDN_URL}/serials/${router.currentRoute.value.params.id}.jpg`"
        class="w-full max-w-[200px] block"
        alt=""
      />

      <input
        type="file"
        class="block w-full"
        @change="(e) => posterChangeHandler(e)"
      />
      <button
        @click="posterUploadHadler"
        class="bg-[white] p-2 mt-[10px] inline-block"
      >
        Обновить
      </button>
    </div>

    <div class="text-[white] mb-[30px] text-[20px]">Список эпизодов</div>

    <div>
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

            <input
              class="block w-full p-2"
              type="date"
              v-model="episode.date"
            />
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

        <button
          @click="
            updateEpisode(episode._id, {
              title: episode.title,
              date: episode.date,
              season: episode.season,
              episode_number: episode.episode_number,
              is_last_season_episode: episode.is_last_season_episode,
            })
          "
          class="bg-[#000000] text-[#FFFFFF] block w-full mb-2"
        >
          Обновить
        </button>
      </div>
    </div>

    <button
      v-if="episodesToDelete.length > 0"
      @click="removeEpisodes"
      to="/admin/episodes/create"
      class="bg-[white] p-2 mt-[30px] block mb-[30px]"
    >
      Массовое удаление
    </button>

    <button
      @click="showAddEpisodesPopup"
      to="/admin/episodes/create"
      class="bg-[white] p-2 mt-[30px] block mb-[30px]"
    >
      Добавить эпизоды
    </button>
  </MainLayout>

  <Popup v-model="isShowAddEpisodesPopup">
    <form
      class="p-2 overflow-y-auto max-h-screen"
      @submit.prevent="addEpisodes"
    >
      <div v-for="(episode, index) in newEpisodes" :key="index">
        <label>
          <span>Дата</span>
          <input
            class="block p-2 mb-2 w-full"
            type="date"
            placeholder="Дата выхода"
            v-model="episode.date"
            required
          />
        </label>

        <label>
          <span>Сезон</span>
          <input
            class="block p-2 mb-2 w-full"
            type="text"
            placeholder="Сезон"
            v-model="episode.season"
            required
          />
        </label>

        <label>
          <span>Эпизод</span>
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
  </Popup>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import MainLayout from "@/views/admin/Layouts/MainLayout.vue";
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

const VITE_CDN_URL = import.meta.env.VITE_CDN_URL;

const router = useRouter();

const serial = ref<ISerialWithEpisodes | null>(null);
const title = ref<string>("");
const img = ref<string>("");
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

const posterUploadHadler = async () => {
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
