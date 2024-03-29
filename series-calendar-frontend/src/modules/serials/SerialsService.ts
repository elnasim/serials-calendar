import { appAxios } from "@/modules/common/axios";
import type { IUserProfile } from "@/modules/user/types";
import type { ISerial } from "./types";

class SerialsService {
  public async addFavoriteSerial(id: string): Promise<ISerial[]> {
    const { data } = await appAxios({
      method: "POST",
      url: `/users/profile/favorites-serials/${id}`,
    });

    return data;
  }

  public async removeFavoriteSerial(id: string): Promise<IUserProfile> {
    const { data } = await appAxios({
      method: "DELETE",
      url: `/users/profile/favorites-serials/${id}`,
    });

    return data;
  }
}

export const serialsService = new SerialsService();
