import axiosInstance from "@app_api/AxiosInstance";
import type { RoleDto } from "@app_interfaces/Role/RoleDto";
import type { ApiResponse } from "@app_interfaces/Response/ApiResponse";
import { handleApiResponse } from "@app_helper/Messages/handleApiResponse";
import { toast } from "react-toastify";

// Create Role
export const createRole = async (role: RoleDto): Promise<RoleDto | null> => {
    try {
        const response = await axiosInstance.post<ApiResponse<RoleDto>>("/roles", role);
        return handleApiResponse(response.data);
    } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to create role.");
        return null;
    }
};

// Update Role
export const updateRole = async (
    roleId: number,
    role: RoleDto
): Promise<RoleDto | null> => {
    try {
        const response = await axiosInstance.put<ApiResponse<RoleDto>>(`/roles/${roleId}`, role);
        return handleApiResponse(response.data);
    } catch (error: any) {
        toast.error(error.response?.data?.message || `Failed to update role with ID ${roleId}.`);
        return null;
    }
};

// Delete Role
export const deleteRole = async (roleId: number): Promise<boolean> => {
    try {
        const response = await axiosInstance.delete<ApiResponse<null>>(`/roles/${roleId}`);
        return handleApiResponse(response.data) !== null;
    } catch (error: any) {
        toast.error(error.response?.data?.message || `Failed to delete role with ID ${roleId}.`);
        return false;
    }
};

// Get Role By ID
export const getRoleById = async (roleId: number): Promise<RoleDto | null> => {
    try {
        const response = await axiosInstance.get<ApiResponse<RoleDto>>(`/roles/${roleId}`);
        return handleApiResponse(response.data);
    } catch (error: any) {
        toast.error(error.response?.data?.message || `Failed to fetch role with ID ${roleId}.`);
        return null;
    }
};

// Get All Roles
export const getAllRoles = async (): Promise<RoleDto[] | null> => {
    try {
        const response = await axiosInstance.get<ApiResponse<RoleDto[]>>("/roles");
        return handleApiResponse(response.data);
    } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to fetch roles.");
        return null;
    }
};