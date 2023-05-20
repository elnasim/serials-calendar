import { defineStore } from "pinia";
import userService from "./UserService";
import type { IUserProfile } from "./types";
import type { ISerial } from "../serials/types";

interface IUserState {
  profile: IUserProfile;
}

export const useUserStore = defineStore("user", {
  state: (): IUserState => ({
    profile: {
      email: "",
      favoriteSerials: [],
      isEmailConfirmed: false,
    },
  }),

  getters: {},

  actions: {
    async getProfile() {
      try {
        this.profile = await userService.getProfile();
      } catch (e) {
        console.log("-->", e);
      }
    },

    setProfile(payload: IUserProfile) {
      this.profile = payload;
    },

    addFavoriteSerialId(ids: ISerial[]) {
      this.profile.favoriteSerials = [...this.profile.favoriteSerials, ...ids];
    },
  },
});
