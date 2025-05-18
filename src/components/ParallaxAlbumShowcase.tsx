import React from 'react';
import { Box, Typography } from '@mui/material';
import HeroSectionImage from '@app_assets/HeroSection/HeroSection.jpg';

const albums = [
  { id: 1, title: 'Wedding Bliss', img: 'https://picsum.photos/id/1015/320/180' },
  { id: 2, title: 'Family Portraits', img: 'https://picsum.photos/id/1021/320/180' },
  { id: 3, title: 'Graduation Day', img: 'https://picsum.photos/id/1033/320/180' },
  { id: 4, title: 'Engagement', img: 'https://picsum.photos/id/1047/320/180' },
  { id: 5, title: 'Birthday Bash', img: 'https://picsum.photos/id/1052/320/180' },
];

const animationDuration = 30; // seconds

const ParallaxAlbumShowcase: React.FC = () => (
  <Box
    sx={{
      width: '100%',
      overflow: 'hidden',
      py: { xs: 2, md: 4 },
      position: 'relative',
      zIndex: 2,
    }}
  >
    <Box
      sx={{
        display: 'flex',
        gap: { xs: 2, md: 4 },
        px: { xs: 1, md: 4 },
        animation: `scroll-left ${animationDuration}s linear infinite`,
        '@keyframes scroll-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        width: 'max-content',
      }}
    >
      {[...albums, ...albums].map((album, idx) => (
        <Box
          key={album.id + '-' + idx}
          sx={{
            minWidth: { xs: 180, sm: 240, md: 320 },
            maxWidth: { xs: 200, sm: 260, md: 340 },
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: 6,
            position: 'relative',
            mx: 1,
            background: 'rgba(30,30,30,0.35)',
            backdropFilter: 'blur(8px)',
            border: '1.5px solid rgba(255,255,255,0.15)',
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'scale(1.04)',
              boxShadow: 12,
            },
          }}
        >
          <img
            src={album.img}
            alt={album.title}
            style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }}
          />
          {/* Gradient overlay for title */}
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: 48,
              background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(20,20,20,0.85) 100%)',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              px: 1,
              pb: 1,
            }}
          >
            <Typography variant="subtitle1" align="center" color="#fff" fontWeight={600} sx={{ textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>
              {album.title}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
);

export default ParallaxAlbumShowcase; 