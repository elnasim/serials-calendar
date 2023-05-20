<template>
  <div class="font-body">
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
import { useUserStore } from "./modules/user/useUserStore";

const authStore = useAuthStore();
const userStore = useUserStore();

onMounted(async () => {
  await authStore.checkLogin();

  if (authStore.isAuth) {
    userStore.getProfile();
  }
});
</script>

<style lang="scss">
@import url("@/modules/common/styles/main.scss");
</style>
