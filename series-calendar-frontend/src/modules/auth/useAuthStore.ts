import { defineStore } from "pinia";
import AuthService from "@/modules/auth/AuthService";
import router from "@/router";
import { routes } from "@/router/Routes";
import {
  ToastTypesEnum,
  useToast,
} from "@/modules/common/components/Toast/useToast";
import type { AxiosError } from "axios";

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
        await AuthService.login(login, password);
        this.setUserAuthOn();
        await router.push(routes.calendarPage());
      } catch (e: any) {
        const error = e as AxiosError<{ message: string; statusCode: number }>;
        showToast(error.response?.data.message, ToastTypesEnum.ERROR);
      }
    },

    async registration(email: string, password: string) {
      try {
        await AuthService.registration(email, password);
        await router.push(routes.calendarPage());
      } catch (e: any) {
        const error = e as AxiosError<{ message: string; statusCode: number }>;
        showToast(error.response?.data.message, ToastTypesEnum.ERROR);
      }
    },

    async checkLogin() {
      const user = await AuthService.checkUser();

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
