import { API_URL } from "./ApiURL";
import axios from "axios";

import type { LoginPayload } from "@app_interfaces/User/LoginPayload";
import type { TokenResponse } from "@app_interfaces/User/TokenResponse";

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
