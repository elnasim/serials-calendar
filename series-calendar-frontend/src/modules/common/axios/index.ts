import axios from "axios";
import router from "@/router";
import { useFullScreenPreloader } from "@/modules/common/components/fullScreenPreloader/useFullScreenPreloader";
import routes from "@/router/Routes";

const { show, hide } = useFullScreenPreloader();

const appAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000,
  withCredentials: true,
});

appAxios.interceptors.request.use(function (request) {
  show();
  return request;
});

appAxios.interceptors.response.use(
  async function (response) {
    await response;
    hide();
    return response;
  },
  async function (error) {
    switch (error.response.status) {
      case 403:
      case 401:
        await router.push(routes.calendarPage());
        break;
    }
    hide();

    return Promise.reject(error);
  }
);

export default appAxios;
