<template>
  <teleport to="body">
    <transition name="popup">
      <div
        v-if="modelValue"
        class="fixed inset-0 p-2 flex justify-center items-center z-50"
      >
        <div
          class="w-full rounded-md overflow-hidden z-[1] popup-body"
          :style="{ 'max-width': maxWidth }"
          ref="target"
        >
          <slot></slot>
        </div>

        <div class="absolute inset-0 bg-color-1/95 popup-background"></div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";

defineProps(["modelValue", "maxWidth"]);
const emit = defineEmits(["update:modelValue"]);

const target = ref(null);

onClickOutside(target, () => emit("update:modelValue", false));
</script>

<style lang="scss" scoped>
$transition: all 0.5s ease;

.popup-enter-active {
  transition: $transition;
}

.popup-enter-from {
  opacity: 0;
}

.popup-enter-active {
  .popup-body {
    transform: scale(1);
    transition: $transition;
  }
}

.popup-enter-from {
  .popup-body {
    transform: scale(0);
  }
}
</style>
