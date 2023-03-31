<template>
  <teleport to="body" v-if="fullScreenPreloaderStore.isShowPreloader">
    <div
      class="fixed inset-0 bg-color-1/20 flex justify-center items-center z-50"
    >
      <span class="bg-[black] text-[white]"> </span>

      <span
        class="material-symbols-rounded text-[white] rotate"
        style="font-size: 60px"
      >
        app_badging
      </span>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { useFullScreenPreloaderStore } from "@/modules/common/store/useFullScreenPreloaderStore";
import { appAxios } from "@/modules/common/axios";
import { onMounted } from "vue";

const fullScreenPreloaderStore = useFullScreenPreloaderStore();

onMounted(() => {
  appAxios.interceptors.request.use(
    function (req) {
      fullScreenPreloaderStore.showPreloader();
      return req;
    },
    function (error) {
      fullScreenPreloaderStore.hidePreloader();
      return Promise.reject(error);
    }
  );

  appAxios.interceptors.response.use(
    function (res) {
      fullScreenPreloaderStore.hidePreloader();
      return res;
    },
    function (error) {
      fullScreenPreloaderStore.hidePreloader();
      return Promise.reject(error);
    }
  );
});
</script>

<style scoped>
.rotate {
  animation-duration: 2s;
  animation-name: rotate;
  animation-iteration-count: infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
