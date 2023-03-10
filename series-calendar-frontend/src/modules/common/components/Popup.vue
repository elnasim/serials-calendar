<template>
  <teleport to="body" v-if="modelValue">
    <div
      class="fixed inset-0 bg-color-1/95 p-2 flex justify-center items-center z-50"
    >
      <div class="bg-color-5" ref="target">
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";
import { ref, defineProps, defineEmits } from "vue";

defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const target = ref(null);

onClickOutside(target, () => emit("update:modelValue", false));
</script>
