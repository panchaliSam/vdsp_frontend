import axiosInstance from "@app_api/AxiosInstance";
import type { EventStaffDto } from "@app_interfaces/EventStaff/EventStaffDto";

// Get all event-staff assignments (admin only)
export const getAllEventStaff = async (): Promise<EventStaffDto[]> => {
    const response = await axiosInstance.get("/eventStaff/getAll");
    return response.data;
};

// Get assigned events for the logged-in staff
export const getMyAssignedEvents = async (): Promise<EventStaffDto[]> => {
    const response = await axiosInstance.get("/eventStaff/my-events");
    console.log("Assigned events:", response.data);
    return response.data;
};

// Get event-staff assignment by ID
export const getEventStaffById = async (id: number): Promise<EventStaffDto> => {
    const response = await axiosInstance.get(`/eventStaff/${id}`);
    return response.data;
};

// Assign staff by full name (admin only)
export const assignStaffByName = async (
    id: number,
    staffName: string
): Promise<EventStaffDto> => {
    const response = await axiosInstance.patch(`/eventStaff/${id}/assignByName`, { staffName });
    return response.data;
};

// Delete assignment (admin only)
export const deleteEventStaff = async (id: number): Promise<void> => {
    await axiosInstance.delete(`/eventStaff/${id}`);
};