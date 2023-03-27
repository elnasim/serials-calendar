<template>
  <div class="w-full max-w-[1000px] mx-auto p-4">
    <div class="text-[white] mb-6">Email: {{ userData?.email }}</div>

    <div class="text-[white] text-2xl">Избранные сериалы</div>

    <div></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import userService from "@/modules/user/UserService";

const userData = ref(null);

onMounted(async () => {
  userData.value = await userService.getProfile();
});
</script>
