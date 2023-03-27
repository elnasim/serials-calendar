<template>
  <teleport to="body">
    <transition name="popup">
      <div
        v-if="modelValue"
        class="fixed inset-0 p-2 flex justify-center items-center z-50"
      >
        <div class="relative z-[1] popup-body">
          <div class="overflow-y-auto max-h-screen" ref="target">
            <slot></slot>
          </div>

          <button
            @click="() => emit('update:modelValue', false)"
            class="absolute top-0 right-0 bg-color-5 z-[2] rounded-full flex items-center justify-center"
          >
            <span class="material-symbols-rounded">close</span>
          </button>
        </div>

        <div class="absolute inset-0 bg-color-1/95 popup-background"></div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";

defineProps(["modelValue"]);
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
