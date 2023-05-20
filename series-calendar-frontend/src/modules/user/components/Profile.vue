<template>
  <div class="">
    <div class="text-[white] mb-6">
      Email: {{ userStore.profile?.email }} |
      <button @click="logout" class="underline">Выйти из аккаунта</button>
    </div>

    <div class="text-[white] text-2xl mb-10">Избранные сериалы</div>

    <FavoriteSerial
      v-for="serial of userStore.profile?.favoriteSerials"
      :key="serial._id"
      :serial="serial"
      :favoriteRemove="favoriteRemove"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import FavoriteSerial from "@/modules/user/components/FavoriteSerial.vue";
import { serialsService } from "@/modules/serials/SerialsService";
import authService from "@/modules/auth/AuthService";
import { useAuthStore } from "@/modules/auth/useAuthStore";
import { routes } from "@/router/Routes";
import { useUserStore } from "@/modules/user/useUserStore";

const { setUserAuthOff } = useAuthStore();
const userStore = useUserStore();
const router = useRouter();

onMounted(() => {
  userStore.getProfile();
});

async function favoriteRemove(serialId: string) {
  if (confirm("Удалить сериал из избранного?")) {
    const updatedProfile = await serialsService.removeFavoriteSerial(serialId);
    userStore.setProfile(updatedProfile);
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
