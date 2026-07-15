import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';
import { useWindows } from '../../context/WindowContext';
import type { AppId } from '../../context/WindowContext';
import { useResize } from './useResize';

interface WindowFrameProps {
  id: AppId;
  children: React.ReactNode;
}

export default function WindowFrame({ id, children }: WindowFrameProps) {
  const { windows, closeWindow, toggleMinimize, toggleMaximize, bringToFront } = useWindows();
  const windowData = windows[id];
  const dragControls = useDragControls();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { size, startResize } = useResize(
    windowData.defaultWidth || 800, 
    windowData.defaultHeight || 500,
    350, 
    300
  );

  if (!windowData.isOpen) return null;

  // Mobile mode constraints
  const activeWidth = isMobile ? '100%' : (windowData.isMaximized ? '100vw' : size.width);
  const activeHeight = isMobile ? '100%' : (windowData.isMaximized ? '100vh' : size.height);
  const dragConstraints = typeof window !== 'undefined' ? { 
    top: -window.innerHeight + 100, 
    left: -window.innerWidth + 100, 
    right: window.innerWidth - 100, 
    bottom: window.innerHeight - 100 
  } : undefined;

  const isActive = windowData.zIndex === Math.max(...Object.values(windows).map(w => w.zIndex));

  return (
    <AnimatePresence>
      {!windowData.isMinimized && (
        <motion.div
          id={`window-${id}`}
          drag={!isMobile && !windowData.isMaximized}
          dragControls={dragControls}
          dragListener={false}
          dragMomentum={false}
          dragElastic={0}
          dragConstraints={dragConstraints}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ 
            opacity: isActive ? 1 : 0.95, 
            scale: 1, 
            width: activeWidth,
            height: activeHeight,
            x: windowData.isMaximized ? 0 : undefined,
            y: windowData.isMaximized ? 0 : 0,
          }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          onPointerDown={() => bringToFront(id)}
          className={`absolute flex flex-col pointer-events-auto bg-[#1c1c1e]/80 backdrop-blur-3xl overflow-hidden transition-shadow duration-300 ${
            isActive ? 'shadow-[0_30px_80px_rgba(0,0,0,0.6),_inset_0_1px_0_rgba(255,255,255,0.15)] border border-white/20' : 'shadow-[0_15px_40px_rgba(0,0,0,0.4),_inset_0_1px_0_rgba(255,255,255,0.1)] border border-white/10'
          } ${
            isMobile || windowData.isMaximized ? 'rounded-none top-0 left-0' : 'rounded-2xl'
          }`}
          style={{ 
            zIndex: windowData.zIndex,
            ...( !isMobile && !windowData.isMaximized ? {
              top: `calc(50vh - ${(windowData.defaultHeight || 500) / 2}px)`,
              left: `calc(50vw - ${(windowData.defaultWidth || 800) / 2}px)`
            } : {})
          }}
        >
          {/* Resize Handles (Desktop Only) */}
          {!isMobile && !windowData.isMaximized && (
            <>
              <div className="absolute top-0 bottom-0 right-0 w-2 cursor-ew-resize z-50" onPointerDown={(e) => startResize(e, 'e')} />
              <div className="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize z-50" onPointerDown={(e) => startResize(e, 's')} />
              <div className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-50" onPointerDown={(e) => startResize(e, 'se')} />
            </>
          )}

          {/* Title Bar (Draggable) */}
          <div 
            className="h-12 flex items-center px-4 relative shrink-0 z-40"
            onPointerDown={(e) => {
              if (!isMobile && !windowData.isMaximized) {
                dragControls.start(e);
              }
            }}
          >
            {/* Traffic Lights */}
            <div className="flex gap-2 absolute left-4 z-50">
              <button 
                onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
                className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] flex items-center justify-center group"
              >
                <X size={8} className="text-black/50 opacity-0 group-hover:opacity-100" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); toggleMinimize(id); }}
                className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] flex items-center justify-center group"
              >
                <Minus size={8} className="text-black/50 opacity-0 group-hover:opacity-100" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); toggleMaximize(id); }}
                className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] flex items-center justify-center group"
              >
                <Maximize2 size={8} className="text-black/50 opacity-0 group-hover:opacity-100" />
              </button>
            </div>
            
            {/* Title */}
            <div className="flex-1 text-center font-medium text-white/80 text-[13px] select-none">
              {windowData.title}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto relative z-10">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
