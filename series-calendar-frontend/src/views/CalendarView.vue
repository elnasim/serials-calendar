<template>
  <MainLayoutWithBottomMenu>
    <div
      class="relative min-h-screen flex items-center justify-center pt-12 pb-24 pl-4 pr-4"
    >
      <Calendar />
    </div>
  </MainLayoutWithBottomMenu>
</template>

<script setup lang="ts">
import Calendar from "@/modules/calendar/components/Calendar.vue";
import MainLayoutWithBottomMenu from "@/views/layouts/MainLayoutWithBottomMenu.vue";
</script>
