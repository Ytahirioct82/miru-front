import axios from "axios";
export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});
instance.defaults.headers["Content-Type"] = "application/json;charset=UTF-8";
instance.defaults.headers["Access-Control-Allow-Origin"] = "https://miru-app.netlify.app";
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          if (error.config.url !== "/user/profile" && error.config.url !== "/activities/favorites") {
            window.location.replace(`/activity/login`);
          }
          break;
        default:
      }
    }
    return Promise.reject(error.response.data);
  }
);
