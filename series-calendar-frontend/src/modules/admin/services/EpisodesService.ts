import type { AxiosRequestHeaders } from "axios";
import appAxios from "@/modules/common/axios";
import type {
  IEpisode,
  IEpisodeUpdate,
  INewEpisode,
  ISerialWithEpisodes,
} from "../types";

class EpisodesService {
  private headers: AxiosRequestHeaders = {};

  async addEpisodes(
    serialId: string,
    episodes: INewEpisode[]
  ): Promise<ISerialWithEpisodes> {
    const { data } = await appAxios({
      method: "POST",
      url: `/api/episodes?serialId=${serialId}`,
      headers: this.headers,
      data: episodes,
    });
    return data;
  }

  async updateEpisode(id: string, episode: IEpisodeUpdate): Promise<IEpisode> {
    const { data } = await appAxios({
      method: "PATCH",
      url: `/api/episodes/${id}`,
      headers: this.headers,
      data: episode,
    });
    return data;
  }

  async removeEpisodes(serialId: string, episodesIds: string[]) {
    const { data } = await appAxios({
      method: "DELETE",
      url: `/api/episodes?serialId=${serialId}`,
      headers: this.headers,
      data: episodesIds,
    });
    return data;
  }
}

const episodesService = new EpisodesService();
export default episodesService;
