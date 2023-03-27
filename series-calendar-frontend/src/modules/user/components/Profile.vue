<template>
  <div class="">
    <div class="text-[white] mb-6">Email: {{ userData?.email }}</div>

    <div class="text-[white] text-2xl mb-10">Избранные сериалы</div>

    <FavoriteSerial />
    <FavoriteSerial />
    <FavoriteSerial />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import userService from "@/modules/user/UserService";
import FavoriteSerial from "@/modules/user/components/FavoriteSerial.vue";

const userData = ref(null);

onMounted(async () => {
  userData.value = await userService.getProfile();
});
</script>
