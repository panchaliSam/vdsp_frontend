import { type FC, useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { toast } from "react-hot-toast";

import { createAlbum } from "@app_api/AlbumApi";
import type { AlbumDto } from "@app_api/AlbumApi";
import { presignBatch, saveImage } from "@app_api/UploadApi";
import { toWebp } from "../utils/image";

interface Props {
    eventId: number | null;
    album: AlbumDto | null;
}

const AlbumUploader: FC<Props> = ({ eventId, album }) => {
    const [albumName, setAlbumName] = useState("");
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [progress, setProgress] = useState<Record<string, number>>({});
    const [uploading, setUploading] = useState(false);
    const inFlight = useRef(false);

    // Disable all if no event selected
    const disabled = uploading || !eventId;
    const hasAlbum = !!album;

    if (inFlight.current) {
        window.onbeforeunload = () => "Uploads are running. Leave?";
    } else {
        window.onbeforeunload = null;
    }

    const onDrop = useCallback((dropped: File[]) => {
        if (!dropped.length) return;
        setSelectedFiles(prev => [...prev, ...dropped]);
    }, []);

    const removeFile = (name: string) => {
        setSelectedFiles(files => files.filter(f => f.name !== name));
    };

    const handlePublish = async () => {
        if (!eventId) return;
        if (!hasAlbum && !albumName.trim()) {
            toast.error("Type an album name first.");
            return;
        }
        if (selectedFiles.length === 0) {
            toast.error("Select at least one photo.");
            return;
        }
        setUploading(true);
        inFlight.current = true;
        setProgress({});
        let albumId = album?.id;
        let tId: string | undefined;
        try {
            if (!albumId) {
                tId = toast.loading("Creating album…");
                const created = await createAlbum(albumName);
                albumId = created.id;
                toast.success(`Album #${albumId} created`, { id: tId });
            }
            const webpFiles = await Promise.all(selectedFiles.map(toWebp));
            const presigned = await presignBatch(webpFiles.map(f => f.name));
            await Promise.all(
                webpFiles.map((file, idx) => {
                    const { presignedUrl, viewUrl, objectKey } = presigned[idx];
                    return axios.put(presignedUrl, file, {
                        headers: {
                            "Content-Type": file.type,
                            "x-amz-acl": "public-read"
                        },
                        onUploadProgress: e =>
                            setProgress(p => ({
                                ...p,
                                [file.name]: Math.round(
                                    (e.loaded / (e.total ?? 1)) * 100
                                )
                            }))
                    }).then(() =>
                        saveImage({
                            image_id: objectKey,
                            path: viewUrl,
                            album_id: albumId!,
                            order: idx + 1
                        }).then(() => toast.success(`✔ ${file.name}`))
                    );
                })
            );
            toast.success("All uploads finished 🎉");
            setSelectedFiles([]);
            setAlbumName("");
        } catch (err: any) {
            toast.error("Upload failed. Please try again.");
        } finally {
            setUploading(false);
            inFlight.current = false;
        }
    };

    const { getRootProps, getInputProps, isDragActive } =
        useDropzone({ onDrop, disabled });

    return (
        <section className="space-y-4">
            {!eventId && <div className="text-gray-500">Select an event to upload an album.</div>}
            {hasAlbum && (
                <div className="p-4 bg-green-50 border border-green-200 rounded">
                    <div className="font-bold">Album already exists for this event:</div>
                    <div>Name: {album.name}</div>
                    <div>Created: {new Date(album.createdAt).toLocaleString()}</div>
                    {/* Optionally list images, etc. */}
                </div>
            )}
            {!hasAlbum && (
                <input
                    className="border rounded p-2 w-full"
                    placeholder="Album name…"
                    value={albumName}
                    onChange={e => setAlbumName(e.target.value)}
                    disabled={disabled}
                />
            )}
            <div
                {...getRootProps()}
                className={`p-10 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
            >
                <input {...getInputProps()} />
                {isDragActive
                    ? "Drop photos here…"
                    : "Drag & drop or click to select photos"}
            </div>
            {selectedFiles.length > 0 && (
                <div className="space-y-2">
                    {selectedFiles.map(file => (
                        <div key={file.name} className="flex items-center gap-2">
                            <span className="text-xs flex-1">{file.name}</span>
                            <button
                                type="button"
                                className="text-red-500 text-xs"
                                onClick={() => removeFile(file.name)}
                                disabled={disabled}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
            {Object.keys(progress).length > 0 && (
                <div>
                    {Object.entries(progress).map(([name, pct]) => (
                        <div key={name} className="mt-2">
                            <span className="text-xs">{name}</span>
                            <progress className="w-full" value={pct} max={100} />
                        </div>
                    ))}
                    <p className="text-sm mt-2">
                        {Object.values(progress).filter(p => p === 100).length}/
                        {Object.keys(progress).length} uploaded
                    </p>
                </div>
            )}
            <button
                className="bg-blue-600 text-white px-6 py-2 rounded mt-4 disabled:opacity-50"
                onClick={handlePublish}
                disabled={disabled || (!hasAlbum && !albumName.trim()) || selectedFiles.length === 0}
            >
                {uploading ? "Publishing…" : hasAlbum ? "Upload to Album" : "Publish"}
            </button>
        </section>
    );
};

export default AlbumUploader; 