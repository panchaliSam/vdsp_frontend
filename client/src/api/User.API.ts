import axios from "axios";
import { API_URL } from "./ApiURL";
import type { LoginPayload } from "@app_interfaces/User/LoginPayload";
import type { TokenResponse } from "@app_interfaces/User/TokenResponse";
import type { UserDto } from "@app_interfaces/User/UserDto";

// Register User API
export const registerUser = async (userData: UserDto): Promise<UserDto> => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error("Registration failed. Please try again later.");
  }
};

// Login User API
export const login = async (userData: LoginPayload): Promise<TokenResponse> => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, userData);
    return response.data;
  } catch (error) {
    throw new Error(
      "Login failed. Please check your credentials or try again later."
    );
  }
};

// Get All Users API (Admin only)
export const getAllUsers = async (): Promise<UserDto[]> => {
  try {
    const response = await axios.get(`${API_URL}/users/getAll`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch users. Please try again later.");
  }
};

// Get User by ID API
export const getUserById = async (id: number): Promise<UserDto> => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      `Failed to fetch user with ID ${id}. Please try again later.`
    );
  }
};

// Update User API
export const updateUser = async (
  id: number,
  updatedUser: UserDto
): Promise<string> => {
  try {
    const response = await axios.put(
      `${API_URL}/users/update/${id}`,
      updatedUser
    );
    return response.data;
  } catch (error) {
    throw new Error(
      `Failed to update user with ID ${id}. Please try again later.`
    );
  }
};

// Delete User API
export const deleteUser = async (id: number): Promise<string> => {
  try {
    const response = await axios.delete(`${API_URL}/users/delete/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      `Failed to delete user with ID ${id}. Please try again later.`
    );
  }
};
