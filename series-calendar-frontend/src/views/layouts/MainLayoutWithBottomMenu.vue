<template>
  <div class="flex flex-col h-screen">
    <div class="flex-1 flex w-full max-w-[1000px] mx-auto"><slot></slot></div>

    <div class="h-[50px] min-h-[50px]"><BottomMenu /></div>
  </div>
</template>

<script setup lang="ts">
import BottomMenu from "@/modules/bottom-panel/components/BottomPanel.vue";
</script>
