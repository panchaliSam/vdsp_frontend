import axiosInstance from "@app_api/AxiosInstance";
import type { EventDto, AlbumStatus } from "@app_interfaces/Event/EventDto";
import type { ApiResponse } from "@app_interfaces/Response/ApiResponse";
import { handleApiResponse } from "@app_helper/Messages/handleApiResponse";
import { toast } from "react-toastify";

// Get all events (Admin/Staff)
export const getAllEvents = async (): Promise<EventDto[] | null> => {
    try {
        const response = await axiosInstance.get<ApiResponse<EventDto[]>>("/events/getAll");
        return handleApiResponse(response.data);
    } catch (error: any) {
        toast.error(error.response?.data?.message || "Unable to fetch events. Please try again later.");
        return null;
    }
};

// Update album status (Admin/Staff)
export const updateAlbumStatus = async (
    eventId: number,
    albumStatus: AlbumStatus
): Promise<EventDto | null> => {
    try {
        const response = await axiosInstance.patch<ApiResponse<EventDto>>(
            `/events/${eventId}/album-status`,
            { albumStatus }
        );
        return handleApiResponse(response.data);
    } catch (error: any) {
        toast.error(error.response?.data?.message || "Unable to update album status. Please try again later.");
        return null;
    }
};