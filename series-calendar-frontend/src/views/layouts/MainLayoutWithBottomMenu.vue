<template>
  <div>
    <slot></slot>

    <BottomMenu />
  </div>
</template>

<script setup lang="ts">
import BottomMenu from "@/modules/bottom-panel/components/BottomPanel.vue";
</script>
