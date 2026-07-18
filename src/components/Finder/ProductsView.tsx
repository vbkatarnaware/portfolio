import React, { useState, useEffect, useRef } from 'react';
import careerosImg from '../../assets/images/careeros.png';
import rizentImg from '../../assets/images/rizent.svg';
import moatdailyImg from '../../assets/images/moatdaily.png';

// Independent Products only — QRapid and ICICI are Professional Experience
// and stay out of this folder, matching the dock's grouping distinction.
const APPLICATIONS = [
  { id: 'careeros', label: 'CareerOS.app', imgSrc: careerosImg.src, action: 'careeros' },
  { id: 'rizent', label: 'Rizent.app', imgSrc: rizentImg.src, action: 'rizent' },
  { id: 'moatdaily', label: 'MoatDaily.app', imgSrc: moatdailyImg.src, action: 'moatdaily' },
];

interface ProductsViewProps {
  onAppLaunch: (action: string) => void;
}

export default function ProductsView({ onAppLaunch }: ProductsViewProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Deselect when clicking outside the icons
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setSelectedId(null);
      }
    };
    document.addEventListener('mousedown', handleDocumentClick);
    return () => document.removeEventListener('mousedown', handleDocumentClick);
  }, []);

  return (
    <div 
      className="flex flex-wrap gap-6 items-start content-start min-h-full" 
      ref={containerRef}
      role="grid"
      aria-label="Applications Folder"
    >
      {APPLICATIONS.map((app) => {
        const isSelected = selectedId === app.id;

        return (
          <div 
            key={app.id} 
            role="gridcell"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onAppLaunch(app.action);
            }}
            onClick={(e) => {
              e.stopPropagation();
              // On mobile, single tap launches since double tap is hard.
              if (window.innerWidth < 1024) {
                onAppLaunch(app.action);
              } else {
                setSelectedId(app.id);
              }
            }}
            onDoubleClick={(e) => {
              e.stopPropagation();
              onAppLaunch(app.action);
            }}
            className="flex flex-col items-center gap-2 cursor-pointer w-24 group focus:outline-none"
            aria-selected={isSelected}
            aria-label={app.label}
          >
            <div className={`w-16 h-16 rounded-2xl overflow-hidden shadow-lg border transition-all ${
              isSelected 
                ? 'border-white ring-2 ring-[#0058d0] ring-offset-2 ring-offset-transparent brightness-75' 
                : 'border-white/10 group-hover:scale-105'
            } bg-white relative`}>
              {isSelected && <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />}
              <img src={app.imgSrc} alt="" className="w-full h-full object-cover relative z-0" draggable={false} />
            </div>
            <span className={`text-[12px] font-medium text-center px-2 py-0.5 rounded transition-colors ${
              isSelected 
                ? 'bg-[#0058d0] text-white' 
                : 'text-white/90 group-hover:bg-[#0058d0] group-hover:text-white'
            }`}>
              {app.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
