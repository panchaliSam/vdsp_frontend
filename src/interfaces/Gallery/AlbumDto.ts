import type { ImageDto } from "@app_interfaces/Gallery/ImageDto";

export interface AlbumDto {
    id: number;
    name: string;
    coverPhoto: string | null;
    eventId?: number;
    images: ImageDto[] | null;
    createdAt: string;
    updatedAt: string;
}