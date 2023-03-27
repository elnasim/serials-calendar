import axios from "axios";
import router from "@/router";
import { routes } from "@/router/Routes";

export const appAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000,
  withCredentials: true,
});

appAxios.interceptors.request.use(function (request) {
  return request;
});

appAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    switch (error.response.status) {
      case 403:
      case 401:
        await router.push(routes.calendarPage());
        break;
    }
    return Promise.reject(error);
  }
);
