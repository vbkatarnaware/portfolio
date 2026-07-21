import React, { useState, lazy, Suspense } from 'react';
import { Network } from 'lucide-react';
import type { UserFlowItem } from '../../../types/app';
import PlaceholderCard from './PlaceholderCard';

const FlowLightbox = lazy(() => import('./FlowLightbox'));

interface FlowViewerProps {
  flows?: UserFlowItem[];
}

export default function FlowViewer({ flows }: FlowViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!flows || flows.length === 0) {
    return <PlaceholderCard icon={Network} label="User Flows" note="User flows and journey maps coming soon." />;
  }

  return (
    <>
      <div className="space-y-12">
        {flows.map((flow, idx) => (
          <div key={idx} className="flex flex-col group/section relative">
            
            {/* Hero Image Preview (No nested cards, pure canvas) */}
            <div 
              className="relative w-full cursor-zoom-in group/image"
              onClick={() => {
                setCurrentIndex(idx);
                setIsOpen(true);
              }}
            >
              <img 
                src={flow.mediaUrl} 
                alt={flow.title} 
                loading="lazy" 
                className="w-full h-auto object-contain drop-shadow-sm transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover/image:scale-[1.01] group-hover/image:drop-shadow-2xl"
              />
            </div>

          </div>
        ))}
      </div>

      <Suspense fallback={null}>
        <FlowLightbox
          flows={flows}
          currentIndex={currentIndex}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onNavigate={setCurrentIndex}
        />
      </Suspense>
    </>
  );
}
