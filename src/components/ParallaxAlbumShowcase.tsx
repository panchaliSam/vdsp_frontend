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
      py: 4,
      background: 'linear-gradient(90deg, #222 60%, #111 100%)',
      boxShadow: 3,
      position: 'relative',
    }}
  >
    <Box
      sx={{
        display: 'flex',
        gap: 4,
        px: 4,
        animation: `scroll-left ${animationDuration}s linear infinite`,
        '@keyframes scroll-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        width: 'max-content',
      }}
    >
      {/* Duplicate albums for seamless loop */}
      {[...albums, ...albums].map((album, idx) => (
        <Box
          key={album.id + '-' + idx}
          sx={{
            minWidth: 280,
            maxWidth: 320,
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: 2,
            background: '#181818',
            transition: 'transform 0.3s',
            '&:hover': {
              transform: 'scale(1.04)'
            }
          }}
        >
          <img
            src={album.img}
            alt={album.title}
            style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }}
          />
          <Typography variant="subtitle1" align="center" color="#fff" py={1}>
            {album.title}
          </Typography>
        </Box>
      ))}
    </Box>
  </Box>
);

export default ParallaxAlbumShowcase; 