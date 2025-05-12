import axios from "axios";
import type { LoginPayload } from "@app_interfaces/User/LoginPayload";
import type { TokenResponse } from "@app_interfaces/User/TokenResponse";
import type { UserDto } from "@app_interfaces/User/UserDto";
import {
  getRefreshToken,
  setTokens,
  clearTokens,
} from "@app_api/helper/TokenHelper";
import { getAuthHeaders } from "@app_api/helper/AuthHelper";
import axiosInstance from "@app_api/AxiosInstance";

// Register User API
export const registerUser = async (userData: UserDto): Promise<UserDto> => {
  try {
    const response = await axiosInstance.post("/users/register", userData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Registration failed. Please try again later.");
  }
};

// Login User API
export const login = async (userData: LoginPayload): Promise<TokenResponse> => {
  try {
    const response = await axiosInstance.post("/users/login", userData);
    const { access_token, refresh_token } = response.data;
    setTokens(access_token, refresh_token);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Login failed. Please check your credentials.");
  }
};

// Get All Users API (Admin only)
export const getAllUsers = async (): Promise<UserDto[]> => {
  try {
    const response = await axiosInstance.get("/users/getAll", {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch users. Please try again later.");
  }
};

// Get User by ID API
export const getUserById = async (id: number): Promise<UserDto> => {
  try {
    const response = await axiosInstance.get(`/users/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch user with ID ${id}.`);
  }
};

// Update User API
export const updateUser = async (
  id: number,
  updatedUser: UserDto
): Promise<string> => {
  try {
    const response = await axiosInstance.put(
      `/users/update/${id}`,
      updatedUser,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to update user with ID ${id}.`);
  }
};

// Delete User API
export const deleteUser = async (id: number): Promise<string> => {
  try {
    const response = await axiosInstance.delete(`/users/delete/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to delete user with ID ${id}.`);
  }
};

// Refresh Token API
export const refreshAccessToken = async (): Promise<void> => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new Error("No refresh token available.");

    const response = await axiosInstance.post("/users/refresh", {
      refresh_token: refreshToken,
    });

    const { accessToken } = response.data;
    setTokens(accessToken, refreshToken);
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 401 &&
      error.response?.data.message === "Invalid or revoked refresh token"
    ) {
      console.error("Refresh token is invalid or revoked.");
    } else if (
      axios.isAxiosError(error) &&
      error.response?.status === 401 &&
      error.response?.data.message === "Refresh token expired"
    ) {
      console.error("Refresh token has expired.");
    } else {
      console.error("Failed to refresh access token.", error);
    }
    clearTokens();
    throw error;
  }
};

// Logout API
export const logout = async (): Promise<void> => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new Error("No refresh token found.");

    await axiosInstance.post("/users/logout", { refresh_token: refreshToken });
    clearTokens();
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        "Logout failed with server error:",
        error.response.status,
        error.response.data
      );
    } else {
      console.error("Logout failed with client error:", error);
    }
    clearTokens();
    throw new Error("Logout failed. Please try again later.");
  }
};
