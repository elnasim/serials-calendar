<template>
  <teleport to="body">
    <div
      v-if="isShowToast"
      class="fixed top-2 right-2 bg-[#000000] p-2 text-[#FFFFFF] rounded-md"
      :style="[
        { background: toastType === ToastTypesEnum.SUCCESS ? 'green' : 'red' },
      ]"
    >
      {{ toastText }}
    </div>
  </teleport>
</template>

<script setup lang="ts">
import {
  ToastTypesEnum,
  useToast,
} from "@/modules/common/components/Toast/useToast";

const { toastText, isShowToast, toastType } = useToast();
</script>
