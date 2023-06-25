import type { AxiosRequestHeaders } from "axios";
import { appAxios } from "@/modules/common/axios";
import type { IMovie, IMovieCreate } from "@/modules/admin/types";

class MoviesService {
  private headers: AxiosRequestHeaders = {};

  public async getAllMovies(): Promise<IMovie[]> {
    const { data } = await appAxios({
      method: "GET",
      url: `/api/movies`,
      headers: this.headers,
    });
    return data;
  }

  public async addMovie(payload: IMovieCreate): Promise<IMovie> {
    const { data } = await appAxios({
      method: "POST",
      url: `/api/movies`,
      headers: this.headers,
      data: payload,
    });

    return data;
  }

  async getMovieById(id: string): Promise<IMovie> {
    const { data } = await appAxios({
      method: "GET",
      url: `/api/movies/${id}`,
      headers: this.headers,
    });

    return data;
  }

  async updateMovieById({ id, title, digital_date }: { id: string; title: string; digital_date: Date }) {
    await appAxios({
      method: "PATCH",
      url: `/api/movies/${id}`,
      headers: this.headers,
      data: {
        title,
        digital_date
      },
    });
  }

  async uploadPoster({ id, poster }: { id: string; poster: Blob }) {
    await appAxios({
      method: "POST",
      url: `/api/movies/${id}/upload-poster`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: {
        file: poster,
      },
    });
  }
}

const moviesService = new MoviesService();
export default moviesService;
