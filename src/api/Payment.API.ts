import axiosInstance from "@app_api/AxiosInstance";

import type { PaymentRequestDto } from "@app_interfaces/Payment/PaymentRequestDto";
import type { PaymentDto } from "@app_interfaces/Payment/PaymentDto";

export const generateHash = async (
  reservation: PaymentRequestDto
): Promise<PaymentRequestDto> => {
  try {
    const response = await axiosInstance.post(
      "/payment/generate-hash",
      reservation
    );
    console.log("Reservation created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create reservation. Please try again later.");
  }
};

export const isAlreadyPaid = async (
  reservation: PaymentDto
): Promise<PaymentDto> => {
  if (!reservation.reservationId) {
    throw new Error("Reservation ID is required");
  }

  try {
    const response = await axiosInstance.get<boolean>(
      `/payment/already-paid/${reservation.reservationId}`
    );

    const alreadyPaid = response.data;

    if (alreadyPaid) {
      return {
        reservationId: reservation.reservationId,
        id: 1
      };
    }

    return {
      reservationId: reservation.reservationId,
    };
  } catch (error) {
    console.error("Failed to check payment status:", error);
    throw new Error("Unable to verify payment status. Please try again.");
  }
};