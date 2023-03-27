<template>
  <router-link
    to=""
    class="mb-4 grid grid-cols-[2fr_14fr_1fr] bg-color-2 rounded-md overflow-hidden"
  >
    <img
      src="http://localhost:9090/serials/640cba0000d6876d26a87e98.jpg"
      class="h-full w-full"
      alt=""
    />

    <div class="p-2 text-[white]">
      <div class="mb-2 font-bold">Винчестеры</div>

      <div>Последняя серия: 01-01-2099</div>

      <div>Дата окончания сезона: Неизвестно</div>
    </div>

    <button @click="favoriteToggle" class="bg-color-5">
      <span class="material-symbols-rounded text-red" style="font-size: 40px">
        favorite
      </span>
    </button>
  </router-link>
</template>

<script setup lang="ts">
function favoriteToggle() {
  console.log("-->", 123);
}
</script>
