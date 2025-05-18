import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import Grid from '@mui/material/Grid';
import { fetchGalleryImages, uploadGalleryImage } from '../api/helper/GalleryHelper';
import type { GalleryImage } from '../api/helper/GalleryHelper';

const isAdmin = true; // TODO: Replace with real role check

const Gallery: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchGalleryImages()
      .then((imgs) => {
        setImages(imgs);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load images');
        setLoading(false);
      });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];
    if (!file) return;
    // Validate type
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setUploadError('Only JPG, PNG, or WEBP images are allowed.');
      return;
    }
    // Validate size (<5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image must be less than 5MB.');
      return;
    }
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    setUploadError(null);
    try {
      const uploaded = await uploadGalleryImage(selectedFile);
      setImages((prev) => [uploaded, ...prev]);
      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (e) {
      setUploadError('Upload failed.');
    }
    setUploading(false);
  };

  if (loading) return <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box
      p={4}
      minHeight="100vh"
      sx={{
        background: 'linear-gradient(to bottom, #181818 60%, #111 100%)',
        color: '#fff',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: '#fff' }}>Gallery</Typography>
      {isAdmin && (
        <Box mb={4}>
          <Typography variant="h6" mb={1} sx={{ color: '#fff' }}>Upload New Image</Typography>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            disabled={uploading}
            style={{ marginBottom: 8 }}
          />
          {previewUrl && (
            <Box mb={1}>
              <img src={previewUrl} alt="Preview" style={{ width: 180, height: 120, objectFit: 'cover', borderRadius: 8 }} />
            </Box>
          )}
          {uploadError && <Alert severity="error">{uploadError}</Alert>}
          <Box>
            <button
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              style={{
                background: '#222', color: '#fff', padding: '8px 20px', borderRadius: 6, border: 'none', cursor: uploading ? 'not-allowed' : 'pointer', marginTop: 8
              }}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </Box>
        </Box>
      )}
      <Grid container spacing={2}>
        {images.map((img) => (
          <Box key={img.id} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%', lg: '25%' }, p: 1 }}>
            <Box borderRadius={2} overflow="hidden" boxShadow={2} bgcolor="#222">
              <img src={img.url} alt={img.title} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
              <Typography align="center" variant="subtitle1" p={1} sx={{ color: '#fff' }}>{img.title}</Typography>
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default Gallery; 