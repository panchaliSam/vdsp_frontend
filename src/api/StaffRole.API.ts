import axiosInstance from "@app_api/AxiosInstance";
import type { StaffRoleDto, StaffAssignStatus } from "@app_interfaces/StaffRole/StaffRoleDto";

// Get all staff roles
export const getAllStaffRoles = async (): Promise<StaffRoleDto[]> => {
    try {
        const response = await axiosInstance.get("/staffRoles/getAll");
        return response.data;
    } catch (error) {
        console.error("Failed to fetch staff roles:", error);
        throw new Error("Unable to fetch staff roles. Please try again.");
    }
};

// Get single staff role by ID
export const getStaffRoleById = async (id: number): Promise<StaffRoleDto> => {
    try {
        const response = await axiosInstance.get(`/staffRoles/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch staff role with ID ${id}:`, error);
        throw new Error(`Unable to fetch staff role with ID ${id}.`);
    }
};

// Update staff role assign status and/or role name
export const updateStaffRole = async (
    id: number,
    assignStatus: StaffAssignStatus,
    roleName?: string
): Promise<StaffRoleDto> => {
    try {
        const payload: { assignStatus: StaffAssignStatus; roleName?: string } = {
            assignStatus,
        };
        if (roleName) {
            payload.roleName = roleName;
        }
        const response = await axiosInstance.patch(`/staffRoles/${id}`, payload);
        return response.data;
    } catch (error) {
        console.error(`Failed to update staff role with ID ${id}:`, error);
        throw new Error(`Unable to update staff role with ID ${id}.`);
    }
};

// Delete staff role
export const deleteStaffRole = async (id: number): Promise<void> => {
    try {
        await axiosInstance.delete(`/staffRoles/${id}`);
    } catch (error) {
        console.error(`Failed to delete staff role with ID ${id}:`, error);
        throw new Error(`Unable to delete staff role with ID ${id}.`);
    }
};

// Get roles by staff ID
export const getRolesByStaffId = async (
    staffId: number
): Promise<StaffRoleDto[]> => {
    try {
        const response = await axiosInstance.get(`/staffRoles/staff/${staffId}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch roles for staff ID ${staffId}:`, error);
        throw new Error(`Unable to fetch roles for staff ID ${staffId}.`);
    }
};