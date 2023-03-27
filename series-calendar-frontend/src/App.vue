<template>
  <div class="bg-color-1 font-body">
    <router-view />

    <FullScreenPreloader />

    <Toast />
  </div>
</template>

<script setup lang="ts">
import FullScreenPreloader from "@/modules/common/components/FullScreenPreloader.vue";
import Toast from "@/modules/common/components/Toast/Toast.vue";
import { onMounted } from "vue";
import { useAuthStore } from "@/modules/auth/useAuthStore";

const { checkLogin } = useAuthStore();

onMounted(() => {
  checkLogin();
});
</script>

<style lang="scss">
@import url("@/modules/common/styles/main.scss");
</style>
