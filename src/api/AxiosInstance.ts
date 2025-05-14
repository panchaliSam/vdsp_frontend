import axios from "axios";
import { refreshAccessToken } from "@app_api/User.API";
import { getAccessToken, clearTokens } from "@app_api/helper/TokenHelper";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {

    // Skip Access Token for specific URLs
    if (config.url?.includes("/users/refresh")) {
      return config;
    } else if (config.url?.includes("/users/login")) {
      return config;
    }

    const accessToken = getAccessToken();
    console.log("Access Token:", accessToken);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;

  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url.includes("/users/refresh")) {

      if (error.response?.status === 401) {
        console.error("Refresh token expired or invalid.");
        clearTokens();

      } else {
        // Handle refresh token expiration
        return Promise.resolve();
      }
    } else if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("Access Token expired. Attempting to refresh...");

      try {
        const newAccessToken = await refreshAccessToken();
        console.log("New Access Token:", newAccessToken);
        if (!newAccessToken) {
          console.log("Token failed to fetch. Token is null or undefined.");
          throw new Error("Failed to refresh access token");
        }

        // Set New Access Token to the request
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${newAccessToken}`; // update default token
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`; // update current request token


        console.log("Token refreshed successfully");

        return axiosInstance(originalRequest);
      } catch (error) {
        return Promise.reject(error); // if refreshToken() fails
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
