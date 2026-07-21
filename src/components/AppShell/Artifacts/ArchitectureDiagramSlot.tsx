import React, { useState, lazy, Suspense } from 'react';
import { Workflow, Maximize2 } from 'lucide-react';
import PlaceholderCard from './PlaceholderCard';

const Lightbox = lazy(() => import('./Lightbox'));

interface ArchitectureDiagramSlotProps {
  diagramUrl?: string | null;
  appName?: string;
}

// Media slot for an uploaded/interactive diagram asset — distinct from
// AppShell/ArchDiagram.tsx, which renders the always-on inline flow diagram
// built from content.architecture. This slot is for a richer artifact later
// (e.g. an exported interactive SVG or a full system diagram image).
export default function ArchitectureDiagramSlot({ diagramUrl, appName }: ArchitectureDiagramSlotProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!diagramUrl) {
    return <PlaceholderCard icon={Workflow} label="Architecture Diagram" note="Interactive architecture diagram coming soon." />;
  }

  const diagramAlt = appName ? `${appName} system architecture diagram` : 'System architecture diagram';
  const lightboxImage = {
    src: diagramUrl,
    alt: diagramAlt,
    title: appName ? `${appName} System Architecture` : 'System Architecture',
    description: 'High-level system architecture and data flow.'
  };

  return (
    <>
      <div
        className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 cursor-pointer group"
        onClick={() => setIsLightboxOpen(true)}
      >
        <img src={diagramUrl} alt={diagramAlt} loading="lazy" className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]" />
        
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-white text-[13px] font-medium shadow-lg border border-white/10">
            <Maximize2 size={14} />
            <span>View Fullscreen</span>
          </div>
        </div>
      </div>

      <Suspense fallback={null}>
        <Lightbox
          images={[lightboxImage]}
          currentIndex={0}
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          onNavigate={() => {}}
        />
      </Suspense>
    </>
  );
}
