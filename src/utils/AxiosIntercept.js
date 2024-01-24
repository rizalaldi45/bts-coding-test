import axios from "axios";

export const requestInterceptor = () =>
  axios.interceptors.request.use(
    function (config) {
      const isDashbaord = document.location.pathname.startsWith("/dashboard");

      const getToken = window && localStorage.getItem("user-auth");

      if (!getToken && isDashbaord) {
        window.location.href = "/";
      } else {
        config.headers.Authorization = `Bearer ${getToken}`;
      }

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

export const responseInterceptor = () =>
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
