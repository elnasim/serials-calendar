import { defineStore } from "pinia";
import AuthService from "../AuthService";

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
      await AuthService.login(login, password);
      this.isAuth = true;
    },
  },
});
