<template>
  <div class="">
    <div class="text-[white] mb-6">
      Email: {{ userProfile?.email }} |
      <button @click="logout" class="underline">Выйти из аккаунта</button>
    </div>

    <div class="text-[white] text-2xl mb-10">Избранные сериалы</div>

    <FavoriteSerial
      v-for="serial of userProfile?.favoriteSerials"
      :key="serial._id"
      :serial="serial"
      :favoriteRemove="favoriteRemove"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import userService from "@/modules/user/UserService";
import FavoriteSerial from "@/modules/user/components/FavoriteSerial.vue";
import type { IUserProfile } from "@/modules/user/types";
import { serialsService } from "@/modules/serials/SerialsService";
import authService from "@/modules/auth/AuthService";
import { useAuthStore } from "@/modules/auth/useAuthStore";
import { routes } from "@/router/Routes";

const { setUserAuthOff } = useAuthStore();
const router = useRouter();

const userProfile = ref<IUserProfile>();

onMounted(async () => {
  userProfile.value = await userService.getProfile();
});

async function favoriteRemove(serialId: string) {
  if (confirm("Удалить сериал из избранного?")) {
    userProfile.value = await serialsService.removeFavoriteSerial(serialId);
  }
}

async function logout() {
  try {
    await authService.logout();
    setUserAuthOff();
    return router.push(routes.calendarPage());
  } catch (e) {
    console.log("-->", e);
  }
}
</script>
