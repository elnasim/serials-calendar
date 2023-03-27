<template>
  <div class="h-full bg-color-1 border-t-color-2 border-t-[1px]">
    <div class="h-full w-full max-w-[1000px] mx-auto flex justify-between">
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

      <router-link
        v-if="authStore.isAuth"
        :to="routes.userProfilePage()"
        class="flex-1 flex items-center justify-center text-[white] relative"
      >
        <span class="material-symbols-rounded">person</span>
      </router-link>

      <router-link
        v-else
        :to="routes.loginPage()"
        class="flex-1 flex items-center justify-center text-[white] relative"
      >
        <span class="material-symbols-rounded">login</span>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { routes } from "@/router/Routes";
import dateHelper from "@/modules/common/helpers/DateHelper";
import BottomPanelMenu from "@/modules/bottom-panel/components/BottomPanelMenu.vue";
import { onClickOutside } from "@vueuse/core";
import { useAuthStore } from "@/modules/auth/useAuthStore";

//-----------------------------------
// PINIA
//-----------------------------------
const authStore = useAuthStore();

//-----------------------------------
// COMPONENT
//-----------------------------------
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
