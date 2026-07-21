import React, { useEffect, useCallback, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import type { UserFlowItem } from '../../../types/app';

interface FlowLightboxProps {
  flows: UserFlowItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function FlowLightbox({ flows, currentIndex, isOpen, onClose, onNavigate }: FlowLightboxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Pan and Zoom state
  const scale = useMotionValue(1);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 200 };
  const smoothScale = useSpring(scale, springConfig);
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const resetView = useCallback(() => {
    scale.set(1);
    x.set(0);
    y.set(0);
  }, [scale, x, y]);

  useEffect(() => {
    if (isOpen) {
      resetView();
    }
  }, [isOpen, currentIndex, resetView]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onNavigate(currentIndex > 0 ? currentIndex - 1 : flows.length - 1);
    if (e.key === 'ArrowRight') onNavigate(currentIndex < flows.length - 1 ? currentIndex + 1 : 0);
    
    // Zoom shortcuts
    if (e.key === '=' || e.key === '+') {
      scale.set(Math.min(scale.get() + 0.25, 4));
    }
    if (e.key === '-') {
      scale.set(Math.max(scale.get() - 0.25, 0.25));
    }
    if (e.key === '0') {
      resetView();
    }
  }, [isOpen, currentIndex, flows.length, onClose, onNavigate, scale, resetView]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      // Zoom
      e.preventDefault();
      const currentScale = scale.get();
      const zoomFactor = -e.deltaY * 0.01;
      scale.set(Math.min(Math.max(currentScale + zoomFactor, 0.25), 4));
    } else {
      // Pan
      x.set(x.get() - e.deltaX);
      y.set(y.get() - e.deltaY);
    }
  }, [scale, x, y]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  const flow = flows[currentIndex];

  return createPortal(
    <AnimatePresence>
      {isOpen && flows.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex flex-col"
          onWheel={handleWheel}
        >
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/80 to-transparent z-50 flex items-center justify-between px-6 pointer-events-none">
            <div className="flex items-center gap-4 pointer-events-auto">
              <h3 className="text-white text-[15px] font-medium tracking-tight">
                {flow.title}
              </h3>
              {flow.verifiedStatus && (
                <span className="text-[11px] font-medium px-2 py-1 bg-white/10 text-white/70 rounded-full">
                  {flow.verifiedStatus}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 pointer-events-auto">
              <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10 mr-4">
                <button 
                  onClick={() => scale.set(Math.max(scale.get() - 0.25, 0.25))}
                  className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                  title="Zoom Out (-)"
                >
                  <ZoomOut size={16} />
                </button>
                <button 
                  onClick={resetView}
                  className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                  title="Reset Zoom (0)"
                >
                  <Maximize size={16} />
                </button>
                <button 
                  onClick={() => scale.set(Math.min(scale.get() + 0.25, 4))}
                  className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                  title="Zoom In (+)"
                >
                  <ZoomIn size={16} />
                </button>
              </div>

              {flow.svgUrl && (
                <a 
                  href={flow.svgUrl} 
                  download
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-white/90 text-[13px] font-medium transition-colors"
                >
                  <Download size={14} />
                  SVG
                </a>
              )}
              {flow.pngUrl && (
                <a 
                  href={flow.pngUrl} 
                  download
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-white/90 text-[13px] font-medium transition-colors"
                >
                  <Download size={14} />
                  PNG
                </a>
              )}
              <div className="w-[1px] h-4 bg-white/20 mx-1"></div>
              <button
                onClick={onClose}
                className="p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Canvas Area */}
          <div 
            ref={containerRef}
            className="flex-1 w-full h-full overflow-hidden cursor-grab active:cursor-grabbing relative"
          >
            <motion.div
              style={{
                scale: smoothScale,
                x: smoothX,
                y: smoothY
              }}
              drag
              dragConstraints={containerRef}
              dragElastic={0.1}
              dragMomentum={false}
              className="w-full h-full flex items-center justify-center p-20"
            >
              <img
                src={flow.mediaUrl}
                alt={flow.title}
                draggable="false"
                className="max-w-none max-h-none pointer-events-none select-none drop-shadow-2xl"
              />
            </motion.div>
          </div>

          {/* Navigation */}
          {flows.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate(currentIndex > 0 ? currentIndex - 1 : flows.length - 1);
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white bg-black/40 hover:bg-black/60 border border-white/10 rounded-full transition-colors z-50 backdrop-blur-md"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate(currentIndex < flows.length - 1 ? currentIndex + 1 : 0);
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white bg-black/40 hover:bg-black/60 border border-white/10 rounded-full transition-colors z-50 backdrop-blur-md"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Bottom Bar Info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-50 flex flex-col items-center justify-end text-center">
             <p className="text-white/80 text-[14px] max-w-2xl">{flow.description}</p>
             {flow.date && <p className="text-white/40 text-[12px] mt-1">Updated {flow.date}</p>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
