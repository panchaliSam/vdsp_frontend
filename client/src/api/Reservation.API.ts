import axiosInstance from "@app_api/AxiosInstance";

import type { ReservationDto } from "@app_interfaces/Reservation/ReservationDto";

// Create Reservation API
export const createReservation = async (
  reservation: ReservationDto
): Promise<ReservationDto> => {
  try {
    const response = await axiosInstance.post(
      "/reservations/create",
      reservation
    );
    console.log("Reservation created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create reservation. Please try again later.");
  }
};

// Get All Reservations API
export const getAllReservations = async (): Promise<ReservationDto[]> => {
  try {
    const response = await axiosInstance.get("/reservations/getAll");
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch reservations. Please try again later.");
  }
};

// Get Reservation by ID API
export const getReservationById = async (
  id: number
): Promise<ReservationDto> => {
  try {
    const response = await axiosInstance.get(`/reservations/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch reservation with ID ${id}.`);
  }
};

//Get Reservation Dates
export const getReservationDates = async (): Promise<ReservationDto[]> => {
  try {
    const response = await axiosInstance.get("/reservations/dates/reserved");
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      "Failed to fetch reservation dates. Please try again later."
    );
  }
};
