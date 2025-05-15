import axiosInstance from "@app_api/AxiosInstance";
import type { RoleDto } from "@app_interfaces/Role/RoleDto";

// Create Role
export const createRole = async (role: RoleDto): Promise<RoleDto> => {
    const response = await axiosInstance.post("/roles", role);
    return response.data;
};

// Update Role
export const updateRole = async (
    roleId: number,
    role: RoleDto
): Promise<RoleDto> => {
    const response = await axiosInstance.put(`/roles/${roleId}`, role);
    return response.data;
};

// Delete Role
export const deleteRole = async (roleId: number): Promise<void> => {
    await axiosInstance.delete(`/roles/${roleId}`);
};

// Get Role By ID
export const getRoleById = async (roleId: number): Promise<RoleDto> => {
    const response = await axiosInstance.get(`/roles/${roleId}`);
    return response.data;
};

// Get All Roles
export const getAllRoles = async (): Promise<RoleDto[]> => {
    const response = await axiosInstance.get("/roles");
    return response.data;
};