import axiosInstance from "@app_api/AxiosInstance";

import type { PaymentRequestDto } from "@app_interfaces/Payment/PaymentRequestDto";
import type { PaymentDto } from "@app_interfaces/Payment/PaymentDto";
import type { PaymentHistoryDto } from "@app_interfaces/Payment/PaymentHistoryDto";

//Wehen creating a reservation, we need to generate a hash for the payment
export const generateHash = async (
  reservation: PaymentRequestDto
): Promise<PaymentRequestDto> => {
  try {
    const response = await axiosInstance.post(
      "/payment/generate-hash",
      reservation
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create payment. Please try again later.");
  }
};

//When the user clicks on the payment button, we need to check if the payment is already done
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

//Customer Dashboard
export const getPaymentHistory = async (): Promise<PaymentHistoryDto[]> => {
  try {
    const response = await axiosInstance.get<PaymentHistoryDto[]>(
      "/paymentHistory/history"
    )
    return response.data;
  } catch (error) {
    console.error("Failed to fetch payment history:", error);
    throw new Error("Unable to fetch payment history. Please try again.");
  }
}

//Admin Dashboard
export const getTotalSuccessfulPayments = async (): Promise<number> => {
  try {
    const response = await axiosInstance.get<number>(
      "/paymentHistory/total-success"
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch total payments:", error);
    throw new Error("Unable to fetch total successful payments.");
  }
};

//Download the report of a reservation
export const downloadConfirmationReport = async (reservationId: number): Promise<void> => {
  try {
    const response = await axiosInstance.get(`/payment/reservation/${reservationId}/confirmation-letter`, {
      responseType: 'blob',
    });

    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `Reservation_Confirmation_${reservationId}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Failed to download confirmation report:", error);
    throw new Error("Unable to download confirmation letter.");
  }
};
