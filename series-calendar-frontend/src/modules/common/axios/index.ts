import axios from "axios";
import router from "@/router";
import { useFullScreenPreloader } from "@/modules/common/components/fullScreenPreloader/useFullScreenPreloader";

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
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    await response;
    hide();
    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    hide();
    await router.push("/");
    return Promise.reject(error);
  }
);

export default appAxios;
