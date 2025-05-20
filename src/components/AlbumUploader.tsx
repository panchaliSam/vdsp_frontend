import { type FC, useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { toast } from "react-hot-toast";

import { createAlbum, updateAlbumCoverPhoto } from "@app_api/AlbumApi";
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
                const created = await createAlbum(albumName, eventId);
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
                    }).then(async () => {
                        await saveImage({
                            image_id: objectKey,
                            path: viewUrl,
                            album_id: albumId!,
                            order: idx + 1
                        });
                        if (idx === 0) {
                            try {
                                await updateAlbumCoverPhoto(albumId!, viewUrl);
                            } catch (err) {
                                toast.error("Failed to update album cover photo");
                            }
                        }
                        toast.success(`✔ ${file.name}`)
                    });
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
        <section className="space-y-6 bg-[#18181b] p-8 rounded-xl shadow-xl" style={{ minHeight: 500 }}>
            {!eventId && <div className="text-gray-400 text-lg">Select an event to upload an album.</div>}
            {hasAlbum && (
                <div className="p-4 mb-4 rounded-lg bg-green-900/30 border border-green-700 text-white shadow-md">
                    <div className="font-bold text-green-200 text-lg mb-1">Album already exists for this event:</div>
                    <div className="text-green-100">Name: <span className="font-semibold">{album.name}</span></div>
                    <div className="text-green-100">Created: {new Date(album.createdAt).toLocaleString()}</div>
                </div>
            )}
            {!hasAlbum && (
                <input
                    className="border border-gray-700 bg-[#23272f] text-white rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                    placeholder="Album name…"
                    value={albumName}
                    onChange={e => setAlbumName(e.target.value)}
                    disabled={disabled}
                />
            )}
            <div
                {...getRootProps()}
                className={`p-10 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 ${disabled ? 'opacity-50 pointer-events-none' : 'hover:border-blue-500'} border-gray-700 bg-[#23272f] text-white`}
            >
                <input {...getInputProps()} />
                {isDragActive
                    ? <span className="text-blue-300">Drop photos here…</span>
                    : <span className="text-gray-200">Drag & drop or click to select photos</span>}
            </div>
            {selectedFiles.length > 0 && (
                <div className="space-y-2">
                    {selectedFiles.map(file => (
                        <div key={file.name} className="flex items-center gap-2">
                            <span className="text-xs text-white flex-1">{file.name}</span>
                            <button
                                type="button"
                                className="text-red-400 text-xs hover:underline"
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
                            <span className="text-xs text-gray-300">{name}</span>
                            <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden mt-1">
                                <div
                                    className="h-full rounded-full transition-all duration-300"
                                    style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)' }}
                                />
                            </div>
                        </div>
                    ))}
                    <p className="text-sm mt-2 text-gray-200">
                        {Object.values(progress).filter(p => p === 100).length}/
                        {Object.keys(progress).length} uploaded
                    </p>
                </div>
            )}
            <button
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg mt-4 disabled:opacity-50 shadow-lg hover:from-blue-500 hover:to-indigo-500 transition-all duration-200 text-lg font-semibold"
                onClick={handlePublish}
                disabled={disabled || (!hasAlbum && !albumName.trim()) || selectedFiles.length === 0}
            >
                {uploading ? "Publishing…" : hasAlbum ? "Upload to Album" : "Publish"}
            </button>
        </section>
    );
};

export default AlbumUploader; 