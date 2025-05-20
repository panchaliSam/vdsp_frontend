import axiosInstance from "@app_api/AxiosInstance";
import type { ImageDto } from "@app_interfaces/Gallery/ImageDto";

export const createImage = async (
    payload: Omit<ImageDto, "image_id">,
    token: string
): Promise<ImageDto> => {
    const response = await axiosInstance.post("/images", payload, {
        headers: { Authorization: token },
    });
    return response.data.data;
};

export const getImageById = async (
    imageId: string,
    token: string
): Promise<ImageDto> => {
    const response = await axiosInstance.get(`/images/${imageId}`, {
        headers: { Authorization: token },
    });
    return response.data.data;
};

export const getImagesByAlbum = async (
    albumId: number,
    token: string
): Promise<ImageDto[]> => {
    const response = await axiosInstance.get(`/images/album/${albumId}`, {
        headers: { Authorization: token },
    });
    return response.data.data;
};

export const updateImage = async (
    imageId: string,
    payload: Partial<ImageDto>,
    token: string
): Promise<ImageDto> => {
    const response = await axiosInstance.put(`/images/${imageId}`, payload, {
        headers: { Authorization: token },
    });
    return response.data.data;
};

export const deleteImage = async (
    imageId: string,
    token: string
): Promise<void> => {
    await axiosInstance.delete(`/images/${imageId}`, {
        headers: { Authorization: token },
    });
};