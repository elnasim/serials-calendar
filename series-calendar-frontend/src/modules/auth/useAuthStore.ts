import { defineStore } from "pinia";
import router from "@/router";
import { routes } from "@/router/Routes";
import {
  ToastTypesEnum,
  useToast,
} from "@/modules/common/components/Toast/useToast";
import type { AxiosError } from "axios";
import authService from "@/modules/auth/AuthService";

const { showToast } = useToast();

export interface IAuthStore {
  isAuth: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): IAuthStore => ({
    isAuth: false,
  }),

  getters: {},

  actions: {
    async login(login: string, password: string) {
      try {
        await authService.login(login, password);
        this.setUserAuthOn();
        await router.push(routes.calendarPage());
      } catch (e: any) {
        const error = e as AxiosError<{ code: string; statusCode: number }>;
        showToast(error.response?.data.code, ToastTypesEnum.ERROR);
      }
    },

    async registration(email: string, password: string) {
      try {
        await authService.registration(email, password);
        await router.push(routes.calendarPage());
      } catch (e: any) {
        const error = e as AxiosError<{ message: string; statusCode: number }>;
        showToast(error.response?.data.message, ToastTypesEnum.ERROR);
      }
    },

    async validateEmail() {
      try {
        await authService.validateEmail(
          router.currentRoute.value.query.token as string
        );
        this.setUserAuthOn();
        showToast("Email успешно подтверждён", ToastTypesEnum.SUCCESS);
      } catch (e: any) {
        const error = e as AxiosError<{ message: string; statusCode: number }>;
        showToast(error.response?.data.message, ToastTypesEnum.ERROR);
      } finally {
        await router.push(routes.calendarPage());
      }
    },

    async checkLogin() {
      const user = await authService.checkUser();

      if (user) {
        this.setUserAuthOn();
      } else {
        this.setUserAuthOff();
      }
    },

    setUserAuthOn() {
      this.isAuth = true;
    },

    setUserAuthOff() {
      this.isAuth = false;
    },
  },
});
