<template>
  <div class="flex flex-col h-screen">
    <slot></slot>

    <div class="h-[50px] min-h-[50px]"><BottomMenu /></div>
  </div>
</template>

<script setup lang="ts">
import BottomMenu from "@/modules/bottom-panel/components/BottomPanel.vue";
</script>
