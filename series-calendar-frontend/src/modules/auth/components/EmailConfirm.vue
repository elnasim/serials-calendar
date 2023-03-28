<template>
  <div></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthStore } from "@/modules/auth/useAuthStore";
const authStore = useAuthStore();

onMounted(() => {
  return authStore.validateEmail();
});
</script>
