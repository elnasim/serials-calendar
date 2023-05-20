import type { AxiosRequestHeaders } from "axios";
import { appAxios } from "@/modules/common/axios";
import type { ISerialCreate, ISerialWithEpisodes } from "../types";

class SerialsService {
  private headers: AxiosRequestHeaders = {};

  public async getAllSerials(): Promise<ISerialWithEpisodes[]> {
    const { data } = await appAxios({
      method: "GET",
      url: `/api/serials`,
      headers: this.headers,
    });
    return data;
  }

  public async addSerial(payload: ISerialCreate): Promise<ISerialWithEpisodes> {
    const { data } = await appAxios({
      method: "POST",
      url: `/api/serials`,
      headers: this.headers,
      data: payload,
    });

    return data;
  }

  async getSerialById(id: string): Promise<ISerialWithEpisodes> {
    const { data } = await appAxios({
      method: "GET",
      url: `/api/serials/${id}`,
      headers: this.headers,
    });

    return data;
  }

  async updateSerialById({ id, title }: { id: string; title: string }) {
    await appAxios({
      method: "PATCH",
      url: `/api/serials/${id}`,
      headers: this.headers,
      data: {
        title,
      },
    });
  }

  async uploadPoster({ id, poster }: { id: string; poster: Blob }) {
    await appAxios({
      method: "POST",
      url: `/api/serials/${id}/upload-poster`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: {
        file: poster,
      },
    });
  }
}

const serialsService = new SerialsService();
export default serialsService;
