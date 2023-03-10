import axios from "axios";
import router from "@/router";

const appAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000,
  withCredentials: true,
});

appAxios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    router.push("/");
    return Promise.reject(error);
  }
);

export default appAxios;
