<template>
  <div class="bg-color-1 font-body">
    <router-view />

    <FullScreenPreloader />
  </div>
</template>

<script setup lang="ts">
import FullScreenPreloader from "@/modules/common/components/fullScreenPreloader/FullScreenPreloader.vue";
</script>

<style lang="scss">
@import url("@/modules/common/styles/main.scss");
</style>
