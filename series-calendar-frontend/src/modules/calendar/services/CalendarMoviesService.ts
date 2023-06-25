import type { AxiosRequestHeaders } from "axios";
import { appAxios } from "@/modules/common/axios";
import type { IMovie } from "../types";
import type { MonthsEnum } from "../types";

class CalendarMoviesService {
  private headers: AxiosRequestHeaders = {};

  /**
   * Возвращает фильмы на выбранный месяц и год.
   */
  async getMoviesByMonthAndYear(
    month: MonthsEnum,
    year: number
  ): Promise<IMovie[]> {
    const { data } = await appAxios({
      method: "GET",
      url: `/api/movies/findAllByMonthAndYear?month=${month}&year=${year}`,
      headers: this.headers,
    });
    return data;
  }
}

const calendarMoviesService = new CalendarMoviesService();
export default calendarMoviesService;
