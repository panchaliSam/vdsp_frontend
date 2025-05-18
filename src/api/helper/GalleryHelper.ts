// GalleryHelper.ts
// API helper for gallery image fetch and upload (mock implementation)

export interface GalleryImage {
  id: number;
  url: string;
  title: string;
}

// Simulate fetching gallery images from an API
export async function fetchGalleryImages(): Promise<GalleryImage[]> {
  await new Promise((res) => setTimeout(res, 500));
  return [
    { id: 1, url: 'https://picsum.photos/id/1011/400/300', title: 'Mountain Lake' },
    { id: 2, url: 'https://picsum.photos/id/1025/400/300', title: 'Dog Portrait' },
    { id: 3, url: 'https://picsum.photos/id/1035/400/300', title: 'Desert Road' },
    { id: 4, url: 'https://picsum.photos/id/1043/400/300', title: 'Forest Path' },
    { id: 5, url: 'https://picsum.photos/id/1050/400/300', title: 'City Skyline' },
    { id: 6, url: 'https://picsum.photos/id/1062/400/300', title: 'Beach Sunset' },
    { id: 7, url: 'https://picsum.photos/id/1074/400/300', title: 'Snowy Mountain' },
  ];
}

// Simulate uploading an image to an API
export async function uploadGalleryImage(file: File): Promise<GalleryImage> {
  await new Promise((res) => setTimeout(res, 700));
  // Use a random picsum image for the uploaded mock
  const randomId = Math.floor(Math.random() * 1000);
  return {
    id: Date.now(),
    url: `https://picsum.photos/id/${randomId}/400/300`,
    title: file.name,
  };
} 