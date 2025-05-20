import axiosInstance from "@app_api/AxiosInstance";

import type { AlbumDto } from "@app_interfaces/Gallery/AlbumDto";
import type { AlbumSummaryDto } from "@app_interfaces/Gallery/AlbumSummaryDto";

// Get all albums (summary)
export const getAllAlbums = async (): Promise<AlbumSummaryDto[]> => {
    try {
        const response = await axiosInstance.get("/albums");
        return response.data;
    } catch (error) {
        console.error("Failed to fetch albums:", error);
        throw new Error("Unable to fetch albums. Please try again later.");
    }
};

// Get album by ID
export const getAlbumById = async (id: number): Promise<AlbumDto> => {
    try {
        const response = await axiosInstance.get(`/albums/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch album with ID ${id}:`, error);
        throw new Error("Unable to fetch album.");
    }
};

// Update album by ID (patch)
export const updateAlbum = async (
    id: number,
    updatedData: Partial<AlbumDto>
): Promise<void> => {
    try {
        await axiosInstance.patch(`/albums/${id}`, updatedData);
    } catch (error) {
        console.error("Failed to update album:", error);
        throw new Error("Album update failed.");
    }
};

// Delete album by ID
export const deleteAlbum = async (id: number): Promise<void> => {
    try {
        await axiosInstance.delete(`/albums/${id}`);
    } catch (error) {
        console.error("Failed to delete album:", error);
        throw new Error("Album deletion failed.");
    }
};