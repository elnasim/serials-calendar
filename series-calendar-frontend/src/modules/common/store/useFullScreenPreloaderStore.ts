import { defineStore } from "pinia";

export interface IFullScreenPreloaderStore {
  isShowPreloader: boolean;
}

export const useFullScreenPreloaderStore = defineStore("fullScreenPreloader", {
  state: (): IFullScreenPreloaderStore => ({
    isShowPreloader: false,
  }),

  getters: {},

  actions: {
    showPreloader() {
      this.isShowPreloader = true;
    },

    hidePreloader() {
      this.isShowPreloader = false;
    },
  },
});
