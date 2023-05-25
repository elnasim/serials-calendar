<template>
  <div class="flex relative justify-center items-center h-screen">
    <form class="w-full max-w-[300px]" @submit.prevent="registrationHandler">
      <label class="mb-2 block">
        <span class="text-[white]">Email:</span>
        <input
          class="block w-full p-2"
          type="text"
          v-model="email"
          placeholder="Email"
          required
        />
      </label>

      <label class="mb-2 block">
        <span class="text-[white]">Пароль:</span>
        <input
          class="block w-full p-2"
          type="password"
          v-model="password"
          placeholder="Пароль"
          required
        />
      </label>

      <label class="mb-2 block">
        <span class="text-[white]">Подтверждение пароля:</span>
        <input
          class="block w-full p-2"
          type="password"
          v-model="repeatPassword"
          placeholder="Подтверждение пароля"
          required
        />
      </label>

      <button class="block w-full p-2 bg-color-5 mb-2">Регистрация</button>

      <div class="text-[white]">
        Уже есть аккаунт?
        <router-link :to="routes.loginPage()" class="text-color-4">
          Войти
        </router-link>
      </div>
    </form>

    <router-link :to="routes.homePage()" class="absolute top-[5px] right-[5px]">
      <span class="material-symbols-rounded text-[white]">close</span>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useAuthStore } from "@/modules/auth/useAuthStore";
import { useToast } from "@/modules/common/components/Toast/useToast";
import { routes } from "@/router/Routes";

const { registration } = useAuthStore();

const { showToast } = useToast();

const email = ref("");
const password = ref("");
const repeatPassword = ref("");

function isPasswordEqual(): boolean {
  return password.value === repeatPassword.value;
}

async function registrationHandler() {
  if (!isPasswordEqual()) {
    showToast("Пароли не совпадают");
    return;
  }

  await registration(email.value, password.value);
}
</script>
