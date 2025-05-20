import axiosInstance from "./AxiosInstance";

/** DTO returned by POST /api/albums */
export interface AlbumDto {
    id: number;
    event_id: number;
    name: string;
    coverPhoto: string | null;
    images: unknown[] | null;
    createdAt: string;
    updatedAt: string;
}

/** Create a new album */
export const createAlbum = async (name: string, event_id: number): Promise<AlbumDto> => {
    const { data } = await axiosInstance.post<AlbumDto>("/albums", { "eventId": event_id, "name": name  });
    return data;
};

/** Get album by event ID */
export const getAlbumByEventId = async (eventId: number): Promise<AlbumDto | null> => {
    try {
        const { data } = await axiosInstance.get(`/albums/event/${eventId}`);
        return data;
    } catch (err) {
        // If not found, return null
        return null;
    }
};

/** Update album cover photo */
export const updateAlbumCoverPhoto = async (albumId: number, coverPhoto: string): Promise<void> => {
    await axiosInstance.patch(`/albums/${albumId}`, { coverPhoto });
}; 