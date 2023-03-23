<template>
  <div class="flex justify-center items-center h-screen">
    <form class="w-full max-w-[300px]" @submit.prevent="registrationHandler">
      <input
        class="block w-full mb-2 p-2"
        type="text"
        v-model="email"
        placeholder="Email"
        required
      />

      <input
        class="block w-full mb-2 p-2"
        type="password"
        v-model="password"
        placeholder="Пароль"
        required
      />

      <input
        class="block w-full mb-2 p-2"
        type="password"
        v-model="repeatPassword"
        placeholder="Подтверждение пароля"
        required
      />

      <button class="block w-full p-2 bg-color-5">Регистрация</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useAuthStore } from "@/modules/auth/store/Auth";
import { useToast } from "@/modules/common/components/Toast/useToast";

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
