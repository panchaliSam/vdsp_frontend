import axiosInstance from "./AxiosInstance";

/* ─────  #2  PRESIGN  ───── */

export interface PresignResponse {
    objectKey: string;     // GUID
    presignedUrl: string;  // PUT target
    viewUrl: string;       // CDN GET url
}

/** POST /api/upload/batch  – pass an array of filenames (webp) */
export const presignBatch = async (
    filenames: string[]
): Promise<PresignResponse[]> => {
    const { data } = await axiosInstance.post<PresignResponse[]>(
        "/upload/batch",
        filenames
    );
    return data;
};

/* ─────  #3  SAVE IMAGE METADATA  ───── */

export interface SaveImagePayload {
    image_id: string;
    path: string;
    album_id: number;
    order: number;
}

export const saveImage = async (payload: SaveImagePayload): Promise<void> => {
    await axiosInstance.post("/images", payload);
}; 