<template>
  <div class="flex justify-center items-center h-screen">
    <form class="w-full max-w-[300px]" @submit.prevent="loginHandler">
      <label class="mb-2 block">
        <span class="block text-[white]">Email:</span>
        <input class="block w-full p-2" type="text" v-model="email" required />
      </label>

      <label class="mb-2 block">
        <span class="block text-[white]">Пароль:</span>
        <input
          class="block w-full p-2"
          type="password"
          v-model="password"
          required
        />
      </label>

      <button class="block w-full p-2 bg-color-5 mb-2">Логин</button>

      <div class="text-[white]">
        Нет аккаунта?
        <router-link :to="routes.registrationPage()" class="text-color-4">
          Создать
        </router-link>
      </div>
    </form>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useAuthStore } from "@/modules/auth/useAuthStore";
import { routes } from "@/router/Routes";

const { login } = useAuthStore();

const email = ref("");
const password = ref("");

const loginHandler = async () => {
  await login(email.value, password.value);
};
</script>
