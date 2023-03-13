import type { AxiosRequestHeaders } from "axios";
import appAxios from "@/modules/common/axios";
import type { ISerialEpisodeWithSerialInfo } from "../types";
import type { MonthsEnum } from "../types";

class CalendarService {
  private headers: AxiosRequestHeaders = {};

  async getEpisodesByMonthAndYear(
    month: MonthsEnum,
    year: number
  ): Promise<ISerialEpisodeWithSerialInfo[]> {
    const { data } = await appAxios({
      method: "GET",
      url: `/api/episodes/findAllByMonthAndYear?month=${month}&year=${year}`,
      headers: this.headers,
    });
    return data;
  }

  async getLastEpisodesByMonthAndYear(
    month: MonthsEnum,
    year: number
  ): Promise<ISerialEpisodeWithSerialInfo[]> {
    const { data } = await appAxios({
      method: "GET",
      url: `/api/episodes/findLastByMonthAndYear?month=${month}&year=${year}`,
      headers: this.headers,
    });
    return data;
  }
}

const calendarService = new CalendarService();
export default calendarService;
