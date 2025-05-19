import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@app_assets/logo/svg/logo-no-background.svg';
import { fetchGalleryImages } from '../api/helper/GalleryHelper';
import type { GalleryImage } from '../api/helper/GalleryHelper';

const INITIAL_SKELETONS = 8;
const MOCK_IMAGE_COUNT = 7;

// Per-cell image card with async loading and fade-in animation
const GalleryImageCard: React.FC<{ img: GalleryImage }> = ({ img }) => {
  const [loaded, setLoaded] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);

  // When image loads, start fade-out of skeleton and fade-in of image
  useEffect(() => {
    if (loaded) {
      const timeout = setTimeout(() => setShowSkeleton(false), 50); // match transition duration
      return () => clearTimeout(timeout);
    }
  }, [loaded]);

  return (
    <div className="rounded-2xl overflow-hidden shadow-tagline bg-[#222] flex flex-col items-center transition-transform duration-300 hover:scale-105">
      <div className="w-full h-56 relative">
        {showSkeleton && (
          <div
            className={`absolute inset-0 bg-[#333] shimmer transition-opacity duration-700 ease-in-out pointer-events-none`}
            style={{ opacity: loaded ? 0 : 1, zIndex: 2 }}
          />
        )}
        <img
          src={img.url}
          alt={img.title}
          className="w-full h-56 object-cover rounded-2xl absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: loaded ? 1 : 0, zIndex: 1 }}
          onLoad={() => setLoaded(true)}
        />
      </div>
      <div className="py-3 w-full text-center">
        <span className="font-medium text-white text-lg drop-shadow-tagline">{img.title}</span>
      </div>
    </div>
  );
};

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const Gallery: React.FC = () => {
  const [images, setImages] = useState<(GalleryImage | undefined)[]>(Array(INITIAL_SKELETONS).fill(undefined));
  const [realImageCount, setRealImageCount] = useState<number | null>(null);
  const [metaOrder, setMetaOrder] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    async function loadImagesRandomly() {
      try {
        // Fetch all metadata up front
        const allImages = await fetchGalleryImages();
        setMetaOrder(allImages);
        setRealImageCount(allImages.length);
        setImages(Array(allImages.length).fill(undefined));
        // Shuffle the metadata for random load order
        const shuffled = shuffle(allImages);
        await Promise.all(
          shuffled.map(async (img) => {
            // Simulate network delay for each image
            await new Promise((res) => setTimeout(res, Math.random() * 1000 + 200));
            if (cancelled) return;
            // Find the index in the original order
            const idx = allImages.findIndex((i) => i.id === img.id);
            setImages((prev) => {
              const next = [...prev];
              next[idx] = img;
              return next;
            });
          })
        );
        setLoading(false);
      } catch {
        setError('Failed to load images');
        setLoading(false);
      }
    }
    loadImagesRandomly();
    return () => { cancelled = true; };
  }, []);

  const gridLength = realImageCount !== null ? realImageCount : images.length;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-b from-[#181818] to-[#111] pb-16">
      {/* Header (same as HeroSection, with back button on left) */}
      <header className="fixed inset-x-0 top-4 z-40 flex justify-between items-center mx-auto w-[min(92%,1280px)] px-6 py-3 backdrop-blur-xl bg-night/60 ring-1 ring-white/8 rounded-3xl">
        {/* Back Button (only on Gallery page) */}
        <button
          onClick={() => navigate('/')}
          className="cta-ghost focus-ring-cyan motion-safe:active:scale-95 text-white flex items-center gap-2 px-5 py-2 rounded-full font-medium shadow-lg transition-all bg-[#222] hover:bg-[#333]"
          aria-label="Back to Home"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block mr-1"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back
        </button>
        <div className="flex-1 flex justify-center">
          <img src={Logo} alt="Lenxlens" className="h-12" />
        </div>
        {/* Empty right side for symmetry */}
        <div className="w-24" />
      </header>
      {/* Spacer for header */}
      <div className="h-24" />
      {error && <div className="text-red-500 text-center mt-12">{error}</div>}
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Array.from({ length: gridLength }).map((_, idx) =>
          images[idx] ? (
            <GalleryImageCard key={images[idx]!.id} img={images[idx]!} />
          ) : (
            <div
              key={`skeleton-${idx}`}
              className="rounded-2xl overflow-hidden shadow-tagline bg-[#222] flex flex-col items-center animate-skeleton-fade"
              style={{ transition: 'opacity 0.5s cubic-bezier(0.42,0,0.58,1), transform 0.5s cubic-bezier(0.42,0,0.58,1)' }}
            >
              <div className="w-full h-56 bg-[#333] rounded-2xl shimmer" />
              <div className="py-3 w-full flex justify-center">
                <div className="h-5 w-32 bg-[#333] rounded shimmer" />
              </div>
            </div>
          )
        )}
      </div>
      <style>{`
        .shadow-tagline { box-shadow: 0 4px 24px rgba(0,0,0,0.45); }
        .drop-shadow-tagline { filter: drop-shadow(0 2px 8px rgba(0,0,0,0.25)); }
        .shimmer {
          position: relative;
          overflow: hidden;
        }
        .shimmer::after {
          content: '';
          position: absolute;
          top: 0; left: -150px; height: 100%; width: 150px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
          animation: shimmer-move 1.5s infinite;
        }
        @keyframes shimmer-move {
          0% { left: -150px; }
          100% { left: 100%; }
        }
        .animate-skeleton-fade {
          opacity: 1;
          transform: scale(1);
          transition: opacity 0.5s cubic-bezier(0.42,0,0.58,1), transform 0.5s cubic-bezier(0.42,0,0.58,1);
        }
        .animate-skeleton-fade-leave {
          opacity: 0;
          transform: scale(0.95);
        }
      `}</style>
    </div>
  );
};

export default Gallery; 