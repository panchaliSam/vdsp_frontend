import axios from "axios";
import toast from "react-hot-toast"
import { refreshAccessToken } from "@app_api/User.API";
import { getAccessToken, clearTokens } from "@app_api/helper/TokenHelper";
import type { ApiResponse } from "@app_interfaces/General/ApiResponse";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Reuquest Interceptor - Adapt
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

// Response Interceptor - Response Handler
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle 2xx responses
    const envelope = response.data as ApiResponse<unknown>
    console.log("Response Envelope:", envelope.message);

    if (envelope.success) {
      toast.success(envelope.message, { duration: 2000, position: "bottom-right" })
      return { ...response, data: envelope.data }
    } else {
      toast.error(envelope.message)
      return Promise.reject(new Error(envelope.message))
    }
  }, async (error) => {
    // Handle 4xx and 5xx responses

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
        toast.error("Failed to refresh access token")
        return Promise.reject(error); // if refreshToken() fails
      }
    }

    toast.error("Failed to refresh access token")
    return Promise.reject(error.message);
  }
);

export default axiosInstance;
