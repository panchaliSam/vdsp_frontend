import type { ReservationApprovalDto } from "@app_interfaces/Reservation/RservationApprovalDto";
import type { ApiResponse } from "@app_interfaces/Response/ApiResponse";
import axiosInstance from "@app_api/AxiosInstance";
import { handleApiResponse } from "@app_helper/Messages/handleApiResponse";
import { toast } from "react-toastify";

// Get All Reservation Approvals API (Admin only)
export const getAllReservationApprovals = async (): Promise<ReservationApprovalDto[] | null> => {
  try {
    const response = await axiosInstance.get<ApiResponse<ReservationApprovalDto[]>>(
      "/reservationApprovals/getAll"
    );
    return handleApiResponse(response.data);
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to fetch reservation approvals.");
    return null;
  }
};

// Get Approved Reservations API (Customer only)
export const getApprovedReservations = async (): Promise<ReservationApprovalDto[] | null> => {
  try {
    const response = await axiosInstance.get<ApiResponse<ReservationApprovalDto[]>>(
      "/reservationApprovals/reservationApproval"
    );
    return handleApiResponse(response.data);
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to fetch approved reservations.");
    return null;
  }
};

// Update Reservation Approval Status API (Admin or Staff only)
export const updateApprovalStatus = async (
  id: number,
  status: string
): Promise<ReservationApprovalDto | null> => {
  try {
    const response = await axiosInstance.patch<ApiResponse<ReservationApprovalDto>>(
      `/reservationApprovals/${id}/status`,
      { status }
    );
    return handleApiResponse(response.data);
  } catch (error: any) {
    toast.error(error.response?.data?.message || `Failed to update status for reservation ID ${id}.`);
    return null;
  }
};