import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import type { ImageItem } from '../../../types/app';
import PlaceholderCard from './PlaceholderCard';

interface ScreenshotsGalleryProps {
  screenshots?: ImageItem[];
}

export default function ScreenshotsGallery({ screenshots }: ScreenshotsGalleryProps) {
  if (!screenshots || screenshots.length === 0) {
    return <PlaceholderCard icon={ImageIcon} label="Screenshots" note="Product screenshots coming soon." />;
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {screenshots.map((s) => (
        <div key={s.src} className="rounded-xl overflow-hidden border border-white/10 bg-white/5 aspect-video">
          <img src={s.src} alt={s.alt} loading="lazy" className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
}
