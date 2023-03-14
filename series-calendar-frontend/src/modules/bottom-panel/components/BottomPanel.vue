<template>
  <div
    class="flex justify-between bg-color-2 h-[50px] fixed bottom-0 left-0 right-0 z-[10]"
  >
    <router-link
      :to="mainPage"
      class="flex-1 text-[white] flex items-center justify-center"
    >
      <span class="material-symbols-rounded">home</span>
    </router-link>

    <button
      @click="showMenu"
      class="flex-1 flex items-center justify-center text-[white] relative"
    >
      <span class="material-symbols-rounded">settings</span>

      <BottomPanelMenu v-if="isShowMenu" ref="target" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import routes from "@/router/Routes";
import dateHelper from "@/modules/common/helpers/DateHelper";
import BottomPanelMenu from "@/modules/bottom-panel/components/BottomPanelMenu.vue";
import { onClickOutside } from "@vueuse/core";

const isShowMenu = ref(false);

function showMenu() {
  isShowMenu.value = true;
}

function hideMenu() {
  isShowMenu.value = false;
}

const target = ref(null);

onClickOutside(target, (e) => {
  e.stopPropagation();
  hideMenu();
});

const date = new Date();
const mainPage = routes.calendarPageWithQueryParams(
  dateHelper.getMonthNameByIndex(date.getMonth()),
  date.getFullYear()
);
</script>
