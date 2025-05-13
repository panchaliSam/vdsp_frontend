import axiosInstance from "@app_api/AxiosInstance";
import { getAuthHeaders } from "@app_api/helper/AuthHelper";
import type { PaymentRequestDto } from "@app_interfaces/Payment/PaymentRequestDto";

export const generateHash = async (
  reservation: PaymentRequestDto
): Promise<PaymentRequestDto> => {
  try {
    const response = await axiosInstance.post(
      "/payment/generate-hash",
      reservation,
      {
        headers: getAuthHeaders(),
      }
    );
    console.log("Reservation created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create reservation. Please try again later.");
  }
};
