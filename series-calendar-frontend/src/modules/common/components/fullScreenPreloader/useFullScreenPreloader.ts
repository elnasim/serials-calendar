import { ref } from "vue";

const isShow = ref(false);
export function useFullScreenPreloader() {
  function show() {
    isShow.value = true;
  }

  function hide() {
    isShow.value = false;
  }

  return { show, hide, isShow };
}
