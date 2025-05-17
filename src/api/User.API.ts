import axios from "axios";
import type { LoginPayload } from "@app_interfaces/User/LoginPayload";
import type { TokenResponse } from "@app_interfaces/User/TokenResponse";
import type { UserDto } from "@app_interfaces/User/UserDto";
import type { ApiResponse } from "@app_interfaces/Response/ApiResponse";
import { handleApiResponse } from "@app_helper/Messages/handleApiResponse";
import { toast } from "react-toastify";
import {
  getRefreshToken,
  setTokens,
  clearTokens,
} from "@app_api/helper/TokenHelper";

import axiosInstance from "@app_api/AxiosInstance";

// Register User API
export const registerUser = async (userData: UserDto): Promise<UserDto | null> => {
  try {
    const response = await axiosInstance.post<ApiResponse<UserDto>>("/users/register", userData);
    return handleApiResponse<UserDto>(response.data);
  } catch (error: any) {
    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Registration failed. Please try again.");
    }
    return null;
  }
};

// Login User API

export const login = async (userData: LoginPayload): Promise<TokenResponse | null> => {
  try {
    const response = await axiosInstance.post<ApiResponse<TokenResponse>>("/users/login", userData);

    const data = handleApiResponse<TokenResponse>(response.data);

    if (data) {
      setTokens(data.access_token, data.refresh_token);
    }

    return data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Login failed. Please check your credentials.");
    }
    return null;
  }
};

// Get All Users API (Admin only)
export const getAllUsers = async (): Promise<UserDto[] | null> => {
  try {
    const response = await axiosInstance.get<ApiResponse<UserDto[]>>("/users/getAll");
    return handleApiResponse<UserDto[]>(response.data);
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to fetch users.");
    return null;
  }
};

// Get User by ID API
export const getUserById = async (id: number): Promise<UserDto | null> => {
  try {
    const response = await axiosInstance.get<ApiResponse<UserDto>>(`/users/${id}`);
    return handleApiResponse<UserDto>(response.data);
  } catch (error: any) {
    toast.error(error.response?.data?.message || `Failed to fetch user with ID ${id}.`);
    return null;
  }
};


// Update User API
export const updateUser = async (
  id: number,
  updatedUser: UserDto
): Promise<boolean> => {
  try {
    const response = await axiosInstance.put<ApiResponse<null>>(`/users/update/${id}`, updatedUser);
    return handleApiResponse<null>(response.data) !== null;
  } catch (error: any) {
    toast.error(error.response?.data?.message || `Failed to update user with ID ${id}.`);
    return false;
  }
};

// Delete User API
export const deleteUser = async (id: number): Promise<boolean> => {
  try {
    const response = await axiosInstance.delete<ApiResponse<null>>(`/users/delete/${id}`);
    return handleApiResponse<null>(response.data) !== null;
  } catch (error: any) {
    toast.error(error.response?.data?.message || `Failed to delete user with ID ${id}.`);
    return false;
  }
};

// Refresh Token API
export const refreshAccessToken = async (): Promise<string> => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new Error("No refresh token available.");

    const response = await axiosInstance.post("/users/refresh", {
      refresh_token: refreshToken,
    });

    console.log("U: Refresh Token Response:", refreshToken);
    console.log("U: Refresh Token Response:", response);
    const accessToken = response.data;
    if (!accessToken) throw new Error("No access token available.");

    // Set new access token
    setTokens(String(accessToken), String(refreshToken));

    return accessToken;
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
    throw error;
  }
};

// Logout API
export const logout = async (): Promise<boolean> => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new Error("No refresh token found.");

    const response = await axiosInstance.post<ApiResponse<null>>("/users/logout", {
      refresh_token: refreshToken,
    });

    clearTokens();
    return handleApiResponse<null>(response.data) !== null;
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Logout failed. Please try again.");
    clearTokens();
    return false;
  }
};
