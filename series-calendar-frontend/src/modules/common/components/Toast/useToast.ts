import { ref } from "vue";

export enum ToastTypesEnum {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

const isShowToast = ref(false);
const toastText = ref<string | undefined>("");
const toastType = ref(ToastTypesEnum.SUCCESS);

export function useToast() {
  const showToast = (
    text: string | undefined,
    toastTypePayload?: ToastTypesEnum
  ) => {
    toastText.value = text;
    isShowToast.value = true;

    if (toastTypePayload) {
      toastType.value = toastTypePayload;
    }

    setTimeout(() => {
      toastText.value = "";
      isShowToast.value = false;
      toastType.value = ToastTypesEnum.SUCCESS;
    }, 3000);
  };

  return { isShowToast, showToast, toastText, toastType };
}
