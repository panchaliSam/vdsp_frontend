import axiosInstance from "@app_api/AxiosInstance";
import type { EventDto, AlbumStatus } from "@app_interfaces/Event/EventDto";

// Get all events (Admin/Staff)
export const getAllEvents = async (): Promise<EventDto[]> => {
    try {
        const response = await axiosInstance.get("/events/getAll/IN_PROGRESS");
        return response.data;
    } catch (error) {
        console.error("Failed to fetch events:", error);
        throw new Error("Unable to fetch events. Please try again later.");
    }
};

// Update album status (Admin/Staff)
export const updateAlbumStatus = async (
    eventId: number,
    albumStatus: AlbumStatus
): Promise<EventDto> => {
    try {
        const response = await axiosInstance.patch(
            `/events/${eventId}/album-status`,
            { albumStatus }
        );
        return response.data;
    } catch (error) {
        console.error(`Failed to update album status for event ${eventId}:`, error);
        throw new Error("Unable to update album status. Please try again later.");
    }
};

// Get all events for the current customer
export const getMyEvents = async (): Promise<EventDto[]> => {
    try {
        const response = await axiosInstance.get<EventDto[]>("/events/my");
        return response.data;
    } catch (error: any) {
        console.error("Failed to fetch customer events:", error);
        throw new Error(error.message || "Unable to fetch your events. Please try again later.");
    }
};
