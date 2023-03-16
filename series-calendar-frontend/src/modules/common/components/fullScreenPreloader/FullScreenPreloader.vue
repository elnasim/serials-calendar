<template>
  <teleport to="body" v-if="isShow">
    <div
      class="fixed inset-0 bg-color-1/20 flex justify-center items-center z-50"
    >
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
import { useFullScreenPreloader } from "@/modules/common/components/fullScreenPreloader/useFullScreenPreloader";

const { isShow } = useFullScreenPreloader();
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
