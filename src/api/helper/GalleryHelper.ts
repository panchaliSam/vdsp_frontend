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
    { id: 1, url: 'https://picsum.photos/id/1011/1024/768', title: 'Mountain Lake' },
    { id: 2, url: 'https://picsum.photos/id/1025/1024/768', title: 'Dog Portrait' },
    { id: 3, url: 'https://picsum.photos/id/1035/1024/768', title: 'Desert Road' },
    { id: 4, url: 'https://picsum.photos/id/1043/1024/768', title: 'Forest Path' },
    { id: 5, url: 'https://picsum.photos/id/1050/1024/768', title: 'City Skyline' },
    { id: 6, url: 'https://picsum.photos/id/1062/1024/768', title: 'Beach Sunset' },
    { id: 7, url: 'https://picsum.photos/id/1074/1024/768', title: 'Snowy Mountain' },
    { id: 8, url: 'https://picsum.photos/id/1011/1024/768', title: 'Mountain Lake' },
    { id: 9, url: 'https://picsum.photos/id/1025/1024/768', title: 'Dog Portrait' },
    { id: 10, url: 'https://picsum.photos/id/1035/1024/768', title: 'Desert Road' },
    { id: 11, url: 'https://picsum.photos/id/1043/1024/768', title: 'Forest Path' },
    { id: 12, url: 'https://picsum.photos/id/1050/1024/768', title: 'City Skyline' },
    { id: 13, url: 'https://picsum.photos/id/1062/1024/768', title: 'Beach Sunset' },
    { id: 14, url: 'https://picsum.photos/id/1074/1024/768', title: 'Snowy Mountain' },
    { id: 15, url: 'https://picsum.photos/id/1011/1024/768', title: 'Mountain Lake' },
    { id: 16, url: 'https://picsum.photos/id/1025/1024/768', title: 'Dog Portrait' },
    { id: 17, url: 'https://picsum.photos/id/1035/1024/768', title: 'Desert Road' },
    { id: 18, url: 'https://picsum.photos/id/1043/1024/768', title: 'Forest Path' },
    { id: 19, url: 'https://picsum.photos/id/1050/1024/768', title: 'City Skyline' },
    { id: 20, url: 'https://picsum.photos/id/1062/1024/768', title: 'Beach Sunset' },
    { id: 21, url: 'https://picsum.photos/id/1074/1024/768', title: 'Snowy Mountain' },
    { id: 22, url: 'https://picsum.photos/id/1011/1024/768', title: 'Mountain Lake' },
    { id: 23, url: 'https://picsum.photos/id/1025/1024/768', title: 'Dog Portrait' },
    { id: 24, url: 'https://picsum.photos/id/1035/1024/768', title: 'Desert Road' },
    { id: 25, url: 'https://picsum.photos/id/1043/1024/768', title: 'Forest Path' },
    { id: 26, url: 'https://picsum.photos/id/1050/1024/768', title: 'City Skyline' },
    { id: 27, url: 'https://picsum.photos/id/1062/1024/768', title: 'Beach Sunset' },
    { id: 28, url: 'https://picsum.photos/id/1074/1024/768', title: 'Snowy Mountain' },
    { id: 29, url: 'https://picsum.photos/id/1011/1024/768', title: 'Mountain Lake' },
    { id: 30, url: 'https://picsum.photos/id/1025/1024/768', title: 'Dog Portrait' },
    { id: 31, url: 'https://picsum.photos/id/1035/1024/768', title: 'Desert Road' },
    { id: 32, url: 'https://picsum.photos/id/1043/1024/768', title: 'Forest Path' },
    { id: 33, url: 'https://picsum.photos/id/1050/1024/768', title: 'City Skyline' },
    { id: 34, url: 'https://picsum.photos/id/1062/1024/768', title: 'Beach Sunset' },
    { id: 35, url: 'https://picsum.photos/id/1074/1024/768', title: 'Snowy Mountain' },
    { id: 36, url: 'https://picsum.photos/id/1011/1024/768', title: 'Mountain Lake' },
    { id: 37, url: 'https://picsum.photos/id/1025/1024/768', title: 'Dog Portrait' },
    { id: 38, url: 'https://picsum.photos/id/1035/1024/768', title: 'Desert Road' },
    { id: 39, url: 'https://picsum.photos/id/1043/1024/768', title: 'Forest Path' },
    { id: 40, url: 'https://picsum.photos/id/1050/1024/768', title: 'City Skyline' },
    { id: 41, url: 'https://picsum.photos/id/1062/1024/768', title: 'Beach Sunset' },
    { id: 42, url: 'https://picsum.photos/id/1074/1024/768', title: 'Snowy Mountain' },
    { id: 43, url: 'https://picsum.photos/id/1011/1024/768', title: 'Mountain Lake' },
    { id: 44, url: 'https://picsum.photos/id/1025/1024/768', title: 'Dog Portrait' },
    { id: 45, url: 'https://picsum.photos/id/1035/1024/768', title: 'Desert Road' },
    { id: 46, url: 'https://picsum.photos/id/1043/1024/768', title: 'Forest Path' },
    { id: 47, url: 'https://picsum.photos/id/1050/1024/768', title: 'City Skyline' },
    { id: 48, url: 'https://picsum.photos/id/1062/1024/768', title: 'Beach Sunset' },
    { id: 49, url: 'https://picsum.photos/id/1074/1024/768', title: 'Snowy Mountain' },
    { id: 50, url: 'https://picsum.photos/id/1011/1024/768', title: 'Mountain Lake' },
    { id: 51, url: 'https://picsum.photos/id/1025/1024/768', title: 'Dog Portrait' },
    { id: 52, url: 'https://picsum.photos/id/1035/1024/768', title: 'Desert Road' },
    { id: 53, url: 'https://picsum.photos/id/1043/1024/768', title: 'Forest Path' },
    { id: 54, url: 'https://picsum.photos/id/1050/1024/768', title: 'City Skyline' },
    { id: 55, url: 'https://picsum.photos/id/1062/1024/768', title: 'Beach Sunset' },
    { id: 56, url: 'https://picsum.photos/id/1074/1024/768', title: 'Snowy Mountain' },
    { id: 57, url: 'https://picsum.photos/id/1011/1024/768', title: 'Mountain Lake' },
    { id: 58, url: 'https://picsum.photos/id/1025/1024/768', title: 'Dog Portrait' },
    { id: 59, url: 'https://picsum.photos/id/1035/1024/768', title: 'Desert Road' },
    { id: 60, url: 'https://picsum.photos/id/1043/1024/768', title: 'Forest Path' },
    { id: 61, url: 'https://picsum.photos/id/1050/1024/768', title: 'City Skyline' },
    { id: 62, url: 'https://picsum.photos/id/1062/1024/768', title: 'Beach Sunset' },
    { id: 63, url: 'https://picsum.photos/id/1074/1024/768', title: 'Snowy Mountain' },
  ];
}

export async function* fetchGalleryImagesProgressive(): AsyncGenerator<GalleryImage, void, unknown> {
  const images = [
    { id: 1, url: 'https://picsum.photos/id/1015/800/450', title: 'Mountain Lake' },
    { id: 2, url: 'https://picsum.photos/id/1025/800/450', title: 'Dog Portrait' },
    { id: 3, url: 'https://picsum.photos/id/1035/800/450', title: 'Desert Road' },
    { id: 4, url: 'https://picsum.photos/id/1043/800/450', title: 'Forest Path' },
    { id: 5, url: 'https://picsum.photos/id/1050/800/450', title: 'City Skyline' },
    { id: 6, url: 'https://picsum.photos/id/1062/800/450', title: 'Beach Sunset' },
    { id: 7, url: 'https://picsum.photos/id/1074/800/450', title: 'Snowy Mountain' },
  ];
  for (const img of images) {
    await new Promise((res) => setTimeout(res, 200));
    yield img;
  }
}