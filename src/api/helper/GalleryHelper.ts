import { getAllAlbums } from "@app_api/Gallery.API";
import type { AlbumSummaryDto } from "@app_interfaces/Gallery/AlbumSummaryDto";

export interface GalleryImage {
  id: number;
  url: string;
  title: string | null;
}

export async function fetchGalleryImages(): Promise<GalleryImage[]> {
  try {
    const albums: AlbumSummaryDto[] = await getAllAlbums();

    return albums.map((album) => ({
      id: album.id,
      url: album.coverPhoto,
      title: null,
    }));
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    throw new Error("Failed to fetch gallery images.");
  }
}

export async function* fetchGalleryImagesProgressive(): AsyncGenerator<GalleryImage, void, unknown> {
  try {
    const albums: AlbumSummaryDto[] = await getAllAlbums();

    for (const album of albums) {
      await new Promise((res) => setTimeout(res, 200));
      yield {
        id: album.id,
        url: album.coverPhoto,
        title: null,
      };
    }
  } catch (error) {
    console.error("Error in progressive gallery image fetch:", error);
    return;
  }
}