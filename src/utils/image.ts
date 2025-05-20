/**
 * Convert an image File (jpeg/png/…) to a WebP File in-browser.
 * If the source is already WebP, it's returned unchanged.
 */
export const toWebp = async (src: File): Promise<File> => {
    if (src.type === "image/webp") return src;

    const bitmap = await createImageBitmap(src);
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(bitmap, 0, 0);

    const blob: Blob = await new Promise(r =>
        canvas.convertToBlob({ type: "image/webp", quality: 0.9 }).then(r)
    );

    const webpName = src.name.replace(/\.[^.]+$/, ".webp");
    return new File([blob], webpName, { type: "image/webp" });
}; 