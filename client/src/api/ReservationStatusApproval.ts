import type { ReservationApprovalDto } from "@app_interfaces/Reservation/RservationApprovalDto";
import { getAuthHeaders } from "@app_api/helper/AuthHelper";
import axiosInstance from "@app_api/AxiosInstance";

// Get All Reservation Approvals API (Admin only)
export const getAllReservationApprovals = async (): Promise<
  ReservationApprovalDto[]
> => {
  try {
    const response = await axiosInstance.get("/reservationApprovals/getAll", {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      "Failed to fetch reservation approvals. Please try again later."
    );
  }
};

// Get Approved Reservations API (Customer only)
export const getApprovedReservations = async (): Promise<
  ReservationApprovalDto[]
> => {
  try {
    const response = await axiosInstance.get(
      "/reservationApprovals/reservationApproval",
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      "Failed to fetch approved reservations. Please try again later."
    );
  }
};

// Update Reservation Approval Status API (Admin or Staff only)
export const updateApprovalStatus = async (
  id: number,
  status: string
): Promise<ReservationApprovalDto> => {
  try {
    const response = await axiosInstance.patch(
      `/reservationApprovals/${id}/status`,
      { status },
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      `Failed to update approval status for reservation with ID ${id}.`
    );
  }
};
