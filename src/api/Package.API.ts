import axiosInstance from "@app_api/AxiosInstance";
import type { PackageDto } from "@app_interfaces/Package/PackageDto";

// Get all packages
export const getAllPackages = async (): Promise<PackageDto[]> => {
    try {
        const response = await axiosInstance.get("/packages");
        return response.data;
    } catch (error) {
        console.error("Failed to fetch packages:", error);
        throw new Error("Unable to fetch packages. Please try again later.");
    }
};

// Get package by ID
export const getPackageById = async (id: number): Promise<PackageDto> => {
    try {
        const response = await axiosInstance.get(`/packages/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch package with ID ${id}:`, error);
        throw new Error("Unable to fetch package.");
    }
};

// Create a new package
export const createPackage = async (
    newPackage: PackageDto
): Promise<PackageDto> => {
    try {
        const response = await axiosInstance.post("/packages", newPackage);
        return response.data;
    } catch (error) {
        console.error("Failed to create package:", error);
        throw new Error("Package creation failed.");
    }
};

// Update package by ID (patch)
export const updatePackage = async (
    id: number,
    updatedData: Partial<PackageDto>
): Promise<void> => {
    try {
        await axiosInstance.patch(`/packages/${id}`, updatedData);
    } catch (error) {
        console.error("Failed to update package:", error);
        throw new Error("Package update failed.");
    }
};

// Delete package by ID
export const deletePackage = async (id: number): Promise<void> => {
    try {
        await axiosInstance.delete(`/packages/${id}`);
    } catch (error) {
        console.error("Failed to delete package:", error);
        throw new Error("Package deletion failed.");
    }
};