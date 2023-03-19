<template>
  <teleport to="body" v-if="modelValue">
    <div
      class="fixed inset-0 bg-color-1/95 p-2 flex justify-center items-center z-50"
    >
      <div
        class="w-full rounded-md overflow-hidden"
        :style="{ 'max-width': maxWidth }"
        ref="target"
      >
        <slot></slot>
      </div>
    </div>
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
