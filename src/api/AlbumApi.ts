import axiosInstance from "./AxiosInstance";

/** DTO returned by POST /api/albums */
export interface AlbumDto {
    id: number;
    name: string;
    coverPhoto: string | null;
    images: unknown[] | null;
    createdAt: string;
    updatedAt: string;
}

/** Create a new album */
export const createAlbum = async (name: string): Promise<AlbumDto> => {
    const { data } = await axiosInstance.post<AlbumDto>("/albums", { name });
    return data;
};

/** Get album by event ID */
export const getAlbumByEventId = async (eventId: number): Promise<AlbumDto | null> => {
    try {
        const { data } = await axiosInstance.get(`/events/${eventId}/album`);
        return data;
    } catch (err) {
        // If not found, return null
        return null;
    }
}; 