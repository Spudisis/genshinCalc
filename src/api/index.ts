import axios from "axios";

const $host = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BASE_URL,
});

const $authHost = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BASE_URL,
});

const authInterceptor = (config: any) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

$authHost.interceptors.response.use(
  (config: any) => {
    return config;
  },
  async (error: any) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const { data } = await $host.get("api/person/refresh", { withCredentials: true });
        const { accessToken } = data.userData;
        localStorage.setItem("token", accessToken);
        return $authHost.request(originalRequest);
      } catch (error) {
        console.log("не авторизован");
      }
    }
    throw error;
  }
);

export { $host, $authHost };
