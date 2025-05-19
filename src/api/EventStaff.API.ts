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
export const getEventStaffById = async (id: number): Promise<EventStaffDto | null> => {
    try {
        const response = await axiosInstance.get(`/eventStaff/${id}`);
        return response.data;
    } catch (error: any) {
        return null;
    }
};

// Assign multiple staff by full names (admin only)
export const assignMultipleStaffByName = async (
    slotId: number,
    staffNames: string[]
): Promise<string | null> => {
    try {
        const res = await axiosInstance.patch(
            `/eventStaff/${slotId}/assignByName`,
            { staffNames }
        );
        return res.data.message;
    } catch (e: any) {
        return null;
    }
};

export const unassignStaff = async (
    slotId: number
): Promise<string | null> => {
    try {
        const res = await axiosInstance.patch(
            `/eventStaff/${slotId}/unassign`
        );
        return res.data.message;
    } catch (e: any) {
        return null;
    }
};

// Delete assignment (admin only)
export const deleteEventStaff = async (id: number): Promise<void> => {
    await axiosInstance.delete(`/eventStaff/${id}`);
};