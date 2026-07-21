import React, { useState } from 'react';
import type { ScreenshotCategory, ImageItem } from '../../../types/app';
import Lightbox from './Lightbox';
import PlaceholderCard from './PlaceholderCard';
import { ImageIcon, LayoutGrid } from 'lucide-react';

interface ScreenshotsGalleryProps {
  categories?: ScreenshotCategory[];
  fallbackScreenshots?: ImageItem[];
}

export default function ScreenshotsGallery({ categories, fallbackScreenshots }: ScreenshotsGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Flatten all categories if they exist, or use fallback screenshots
  const allImages = categories && categories.length > 0 
    ? categories.flatMap(c => c.images.map(img => ({
        ...img,
        title: img.title || c.title,
        description: img.description || c.description
      })))
    : fallbackScreenshots?.map(img => ({ ...img, title: '', description: '' })) || [];

  if (allImages.length === 0) {
    return <PlaceholderCard icon={ImageIcon} label="Product Screenshots" note="Product screenshots coming soon." />;
  }

  // Show only 2 screenshots inline
  const MAX_INLINE = 2;
  const inlineImages = allImages.slice(0, MAX_INLINE);
  const hasMore = allImages.length > MAX_INLINE;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {inlineImages.map((img, i) => (
          <div 
            key={i} 
            className="group relative rounded-xl overflow-hidden cursor-pointer border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all shadow-sm hover:shadow-xl hover:-translate-y-0.5 aspect-video"
            onClick={() => {
              setLightboxIndex(i);
              setLightboxOpen(true);
            }}
          >
            <div className="w-full h-full bg-black/40 overflow-hidden ring-1 ring-black/50 flex items-center justify-center">
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out" 
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <button
          onClick={() => {
            setLightboxIndex(0);
            setLightboxOpen(true);
          }}
          className="absolute top-0 right-0 text-[12px] font-medium text-white/50 hover:text-white transition-colors"
        >
          See all ({allImages.length})
        </button>
      )}

      {/* Lightbox for viewing all images in fullscreen */}
      <Lightbox 
        isOpen={lightboxOpen} 
        images={allImages} 
        currentIndex={lightboxIndex} 
        onClose={() => setLightboxOpen(false)} 
        onNavigate={setLightboxIndex} 
      />
    </div>
  );
}
