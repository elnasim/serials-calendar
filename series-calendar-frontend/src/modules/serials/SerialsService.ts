import { appAxios } from "@/modules/common/axios";
import type { IUserProfile } from "@/modules/user/types";

class SerialsService {
  public addFavoriteSerial(id: string) {
    return appAxios({
      method: "POST",
      url: `/users/profile/favorites-serials/${id}`,
    });
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
