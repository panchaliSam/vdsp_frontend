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

export const downloadConfirmationReport = async (
  reservationId: number
): Promise<void> => {
  try {
    // Call without responseType so we get JSON (or whatever the interceptor returns).
    const resp = await axiosInstance.get(
      `/payment/reservation/${reservationId}/confirmation-letter`
    );

    // 1) If your interceptor unwrapped the envelope, `resp` is already the Base64 string.
    // 2) Otherwise it's an object { success, message, data }.
    let base64: string;
    if (typeof resp === "string") {
      base64 = resp;
    } else if (typeof resp.data === "string") {
      base64 = resp.data;
    } else if (resp.data && typeof resp.data.data === "string") {
      base64 = resp.data.data;
    } else {
      console.error("Full response was:", resp);
      throw new Error("No PDF data returned");
    }

    // (Optional) log so you can see which branch you hit
    console.log("Got PDF Base64:", base64.slice(0, 50) + "...");

    // Decode and download as before
    const binary = atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    const blob = new Blob([bytes.buffer], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Reservation_Confirmation_${reservationId}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

  } catch (error: any) {
    console.error("Failed to download confirmation report:", error);
    throw new Error(error.message || "Unable to download confirmation letter.");
  }
};