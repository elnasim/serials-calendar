<template>
  <div class="flex justify-center items-center h-screen">
    <form class="w-full max-w-[300px]" @submit.prevent="loginHandler">
      <input
        class="block w-full mb-2 p-2"
        type="text"
        v-model="username"
        required
      />
      <input
        class="block w-full mb-2 p-2"
        type="password"
        v-model="password"
        required
      />
      <button class="block w-full p-2 bg-color-5">Логин</button>
    </form>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useAuthStore } from "@/modules/auth/store/Auth";

const { login } = useAuthStore();

const username = ref("");
const password = ref("");

const loginHandler = async () => {
  await login(username.value, password.value);
};
</script>
