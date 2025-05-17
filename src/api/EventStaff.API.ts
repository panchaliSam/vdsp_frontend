import axiosInstance from "@app_api/AxiosInstance";
import type { EventStaffDto } from "@app_interfaces/EventStaff/EventStaffDto";
import type { ApiResponse } from "@app_interfaces/Response/ApiResponse";
import { handleApiResponse } from "@app_helper/Messages/handleApiResponse";
import { toast } from "react-toastify";

// Get all event-staff assignments (admin only)
export const getAllEventStaff = async (): Promise<EventStaffDto[] | null> => {
    try {
        const response = await axiosInstance.get<ApiResponse<EventStaffDto[]>>("/eventStaff/getAll");
        return handleApiResponse(response.data);
    } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to fetch event-staff assignments.");
        return null;
    }
};

// Get assigned events for the logged-in staff
export const getMyAssignedEvents = async (): Promise<EventStaffDto[] | null> => {
    try {
        const response = await axiosInstance.get<ApiResponse<EventStaffDto[]>>("/eventStaff/my-events");
        return handleApiResponse(response.data);
    } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to fetch assigned events.");
        return null;
    }
};

// Get event-staff assignment by ID
export const getEventStaffById = async (id: number): Promise<EventStaffDto | null> => {
    try {
        const response = await axiosInstance.get<ApiResponse<EventStaffDto>>(`/eventStaff/${id}`);
        return handleApiResponse(response.data);
    } catch (error: any) {
        toast.error(error.response?.data?.message || `Failed to fetch event-staff assignment with ID ${id}.`);
        return null;
    }
};

// Assign staff by full name (admin only)
export const assignStaffByName = async (
    id: number,
    staffName: string
): Promise<EventStaffDto | null> => {
    try {
        const response = await axiosInstance.patch<ApiResponse<EventStaffDto>>(
            `/eventStaff/${id}/assignByName`,
            { staffName }
        );
        return handleApiResponse(response.data);
    } catch (error: any) {
        toast.error(error.response?.data?.message || `Failed to assign staff to event ID ${id}.`);
        return null;
    }
};

// Delete assignment (admin only)
export const deleteEventStaff = async (id: number): Promise<boolean> => {
    try {
        const response = await axiosInstance.delete<ApiResponse<null>>(`/eventStaff/${id}`);
        return handleApiResponse(response.data) !== null;
    } catch (error: any) {
        toast.error(error.response?.data?.message || `Failed to delete assignment for event ID ${id}.`);
        return false;
    }
};