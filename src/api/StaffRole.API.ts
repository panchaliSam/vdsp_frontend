import axiosInstance from "@app_api/AxiosInstance";
import type { StaffRoleDto, StaffAssignStatus } from "@app_interfaces/StaffRole/StaffRoleDto";
import type { ApiResponse } from "@app_interfaces/Response/ApiResponse";
import { handleApiResponse } from "@app_helper/Messages/handleApiResponse";
import { toast } from "react-toastify";

// Get all staff roles
export const getAllStaffRoles = async (): Promise<StaffRoleDto[] | null> => {
    try {
        const response = await axiosInstance.get<ApiResponse<StaffRoleDto[]>>("/staffRoles/getAll");
        return handleApiResponse(response.data);
    } catch (error: any) {
        toast.error(error.response?.data?.message || "Unable to fetch staff roles.");
        return null;
    }
};

// Get single staff role by ID
export const getStaffRoleById = async (id: number): Promise<StaffRoleDto | null> => {
    try {
        const response = await axiosInstance.get<ApiResponse<StaffRoleDto>>(`/staffRoles/${id}`);
        return handleApiResponse(response.data);
    } catch (error: any) {
        toast.error(error.response?.data?.message || `Unable to fetch staff role with ID ${id}.`);
        return null;
    }
};

// Update staff role assign status and/or role name
export const updateStaffRole = async (
    id: number,
    assignStatus: StaffAssignStatus,
    roleName?: string
): Promise<StaffRoleDto | null> => {
    try {
        const payload: { assignStatus: StaffAssignStatus; roleName?: string } = { assignStatus };
        if (roleName) payload.roleName = roleName;

        const response = await axiosInstance.patch<ApiResponse<StaffRoleDto>>(`/staffRoles/${id}`, payload);
        return handleApiResponse(response.data);
    } catch (error: any) {
        toast.error(error.response?.data?.message || `Unable to update staff role with ID ${id}.`);
        return null;
    }
};

// Delete staff role
export const deleteStaffRole = async (id: number): Promise<boolean> => {
    try {
        const response = await axiosInstance.delete<ApiResponse<null>>(`/staffRoles/${id}`);
        return handleApiResponse(response.data) !== null;
    } catch (error: any) {
        toast.error(error.response?.data?.message || `Unable to delete staff role with ID ${id}.`);
        return false;
    }
};

// Get roles by staff ID
export const getRolesByStaffId = async (staffId: number): Promise<StaffRoleDto[] | null> => {
    try {
        const response = await axiosInstance.get<ApiResponse<StaffRoleDto[]>>(`/staffRoles/staff/${staffId}`);
        return handleApiResponse(response.data);
    } catch (error: any) {
        toast.error(error.response?.data?.message || `Unable to fetch roles for staff ID ${staffId}.`);
        return null;
    }
};