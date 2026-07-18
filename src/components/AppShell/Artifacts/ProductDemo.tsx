import React from 'react';
import { Video } from 'lucide-react';
import PlaceholderCard from './PlaceholderCard';

interface ProductDemoProps {
  videoUrl?: string | null;
}

export default function ProductDemo({ videoUrl }: ProductDemoProps) {
  if (!videoUrl) {
    return <PlaceholderCard icon={Video} label="Product Demo" note="Loom walkthrough will be added here." />;
  }
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 aspect-video bg-black">
      <iframe
        src={videoUrl}
        title="Product Demo"
        loading="lazy"
        allow="autoplay; fullscreen"
        className="w-full h-full"
      />
    </div>
  );
}
