<template>
  <button class="bg-color-5 p-2 text-[black]">
    {{ text }}
  </button>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>
