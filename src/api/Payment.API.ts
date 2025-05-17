import axiosInstance from "@app_api/AxiosInstance";

import type { PaymentRequestDto } from "@app_interfaces/Payment/PaymentRequestDto";
import type { PaymentDto } from "@app_interfaces/Payment/PaymentDto";
import type { PaymentHistoryDto } from "@app_interfaces/Payment/PaymentHistoryDto";
import type { ApiResponse } from "@app_interfaces/Response/ApiResponse";
import { handleApiResponse } from "@app_helper/Messages/handleApiResponse";
import { toast } from "react-toastify";

// Generate payment hash when creating a reservation
export const generateHash = async (
  reservation: PaymentRequestDto
): Promise<PaymentRequestDto | null> => {
  try {
    const response = await axiosInstance.post<ApiResponse<PaymentRequestDto>>(
      "/payment/generate-hash",
      reservation
    );
    return handleApiResponse(response.data);
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to generate payment hash.");
    return null;
  }
};

// Check if payment is already done
export const isAlreadyPaid = async (
  reservation: PaymentDto
): Promise<PaymentDto> => {
  if (!reservation.reservationId) {
    toast.error("Reservation ID is required");
    throw new Error("Reservation ID is required");
  }

  try {
    const response = await axiosInstance.get<ApiResponse<boolean>>(
      `/payment/already-paid/${reservation.reservationId}`
    );

    const alreadyPaid = handleApiResponse<boolean>(response.data);

    if (alreadyPaid) {
      return {
        reservationId: reservation.reservationId,
        id: 1,
      };
    }

    return {
      reservationId: reservation.reservationId,
    };
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Unable to verify payment status.");
    throw new Error("Payment check failed.");
  }
};

// Customer Dashboard: Get payment history
export const getPaymentHistory = async (): Promise<PaymentHistoryDto[] | null> => {
  try {
    const response = await axiosInstance.get<ApiResponse<PaymentHistoryDto[]>>(
      "/paymentHistory/history"
    );
    return handleApiResponse(response.data);
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Unable to fetch payment history.");
    return null;
  }
};

// Admin Dashboard: Get total successful payments
export const getTotalSuccessfulPayments = async (): Promise<number | null> => {
  try {
    const response = await axiosInstance.get<ApiResponse<number>>(
      "/paymentHistory/total-success"
    );
    return handleApiResponse(response.data);
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Unable to fetch total successful payments.");
    return null;
  }
};

// Download confirmation report for reservation
export const downloadConfirmationReport = async (reservationId: number): Promise<void> => {
  try {
    const response = await axiosInstance.get(
      `/payment/reservation/${reservationId}/confirmation-letter`,
      { responseType: "blob" }
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `Reservation_Confirmation_${reservationId}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

    toast.success("Confirmation letter downloaded successfully.");
  } catch (error: any) {
    toast.error("Unable to download confirmation letter.");
    console.error("Download error:", error);
  }
};