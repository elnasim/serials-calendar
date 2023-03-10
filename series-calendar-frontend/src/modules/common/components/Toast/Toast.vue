<template>
  <div
    v-if="isShowToast"
    class="fixed top-2 right-2 bg-[#000000] p-2 text-[#FFFFFF]"
  >
    1234
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isShowToast = ref(true);
</script>
