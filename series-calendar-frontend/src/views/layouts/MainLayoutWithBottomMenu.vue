<template>
  <div
    class="w-full max-w-[1000px] mx-auto h-screen overflow-y-auto px-[10px] pt-4 pb-[70px]"
  >
    <slot></slot>
  </div>

  <div class="fixed bottom-0 left-0 right-0 h-[50px] z-[1]">
    <BottomMenu />
  </div>
</template>

<script setup lang="ts">
import BottomMenu from "@/modules/bottom-panel/components/BottomPanel.vue";
</script>
