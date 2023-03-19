import { ref } from "vue";

// by convention, composable function names start with "use"
export function useToast() {
  const isShowToast = ref(false);

  const showToast = () => {
    isShowToast.value = true;
  };

  return { isShowToast, showToast };
}
