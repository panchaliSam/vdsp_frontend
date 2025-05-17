import axiosInstance from "@app_api/AxiosInstance";
import type { ReservationDto } from "@app_interfaces/Reservation/ReservationDto";
import type { ApiResponse } from "@app_interfaces/Response/ApiResponse";
import { handleApiResponse } from "@app_helper/Messages/handleApiResponse";
import { toast } from "react-toastify";

// Create Reservation API
export const createReservation = async (
  reservation: ReservationDto
): Promise<ReservationDto | null> => {
  try {
    const response = await axiosInstance.post<ApiResponse<ReservationDto>>(
      "/reservations/create",
      reservation
    );
    return handleApiResponse(response.data);
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to create reservation.");
    return null;
  }
};

// Get All Reservations API
export const getAllReservations = async (): Promise<ReservationDto[] | null> => {
  try {
    const response = await axiosInstance.get<ApiResponse<ReservationDto[]>>(
      "/reservations/getAll"
    );
    return handleApiResponse(response.data);
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to fetch reservations.");
    return null;
  }
};

// Get Reservation by ID API
export const getReservationById = async (
  id: number
): Promise<ReservationDto | null> => {
  try {
    const response = await axiosInstance.get<ApiResponse<ReservationDto>>(
      `/reservations/${id}`
    );
    return handleApiResponse(response.data);
  } catch (error: any) {
    toast.error(error.response?.data?.message || `Failed to fetch reservation with ID ${id}.`);
    return null;
  }
};

// Get Reserved Dates
export const getReservationDates = async (): Promise<any | null> => {
  try {
    const response = await axiosInstance.get<ApiResponse<any>>(
      "/reservations/dates/reserved"
    );
    return handleApiResponse(response.data);
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to fetch reservation dates.");
    return null;
  }
};