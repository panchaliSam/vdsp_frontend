import axiosInstance from "@app_api/AxiosInstance";
import type { PackageDto } from "@app_interfaces/Package/PackageDto";
import type { ApiResponse } from "@app_interfaces/Response/ApiResponse";
import { handleApiResponse } from "@app_helper/Messages/handleApiResponse";
import { toast } from "react-toastify";

// Get all packages
export const getAllPackages = async (): Promise<PackageDto[] | null> => {
    try {
        const response = await axiosInstance.get<ApiResponse<PackageDto[]>>("/packages");
        return handleApiResponse(response.data);
    } catch (error: any) {
        toast.error(error.response?.data?.message || "Unable to fetch packages.");
        return null;
    }
};

// Get package by ID
export const getPackageById = async (id: number): Promise<PackageDto | null> => {
    try {
        const response = await axiosInstance.get<ApiResponse<PackageDto>>(`/packages/${id}`);
        return handleApiResponse(response.data);
    } catch (error: any) {
        toast.error(error.response?.data?.message || `Unable to fetch package with ID ${id}.`);
        return null;
    }
};

// Create a new package
export const createPackage = async (newPackage: PackageDto): Promise<PackageDto | null> => {
    try {
        const response = await axiosInstance.post<ApiResponse<PackageDto>>("/packages", newPackage);
        return handleApiResponse(response.data);
    } catch (error: any) {
        toast.error(error.response?.data?.message || "Package creation failed.");
        return null;
    }
};

// Update package by ID (patch)
export const updatePackage = async (
    id: number,
    updatedData: Partial<PackageDto>
): Promise<boolean> => {
    try {
        const response = await axiosInstance.patch<ApiResponse<null>>(`/packages/${id}`, updatedData);
        return handleApiResponse(response.data) !== null;
    } catch (error: any) {
        toast.error(error.response?.data?.message || "Package update failed.");
        return false;
    }
};

// Delete package by ID
export const deletePackage = async (id: number): Promise<boolean> => {
    try {
        const response = await axiosInstance.delete<ApiResponse<null>>(`/packages/${id}`);
        return handleApiResponse(response.data) !== null;
    } catch (error: any) {
        toast.error(error.response?.data?.message || "Package deletion failed.");
        return false;
    }
};