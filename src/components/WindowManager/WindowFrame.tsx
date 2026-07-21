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
  const { windows, closeWindow, toggleMinimize, toggleMaximize, bringToFront, updatePosition, updateSize } = useWindows();
  const windowData = windows[id];
  const dragControls = useDragControls();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Seeded from context (windowData.size) so a minimize→restore within the
  // same session keeps whatever the user last resized it to — a fresh
  // mount only falls back to defaultWidth/Height the very first time.
  const { size, startResize, isResizing } = useResize(
    windowData.size?.width ?? windowData.defaultWidth ?? 800,
    windowData.size?.height ?? windowData.defaultHeight ?? 500,
    350,
    300
  );

  // Commit the final size back into context once the resize gesture ends,
  // so it survives a minimize/restore (WindowFrame unmounts while minimized).
  const wasResizing = React.useRef(false);
  useEffect(() => {
    if (wasResizing.current && !isResizing) {
      updateSize(id, size);
    }
    wasResizing.current = isResizing;
  }, [isResizing, size, id, updateSize]);

  // Tracks viewport size so the drag-constraint math further down (which
  // mirrors the cascade top/left formula in the style block) stays correct
  // across resizes, not just at mount. Declared above the isOpen early
  // return below — every hook must run unconditionally on every render, or
  // React throws the moment this window's isOpen flips and the hook count
  // changes between renders of the same mounted instance.
  const [viewport, setViewport] = useState(() =>
    typeof window !== 'undefined'
      ? { width: window.innerWidth, height: window.innerHeight }
      : { width: 1280, height: 800 }
  );
  useEffect(() => {
    const onResize = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (!windowData.isOpen) return null;

  // The fixed MacToolbar (h-8 = 2rem, z-50) sits above every window's own
  // z-index. A maximized window that goes fully to the screen's top edge
  // therefore has the top 2rem of its title bar — exactly where the
  // traffic lights live — silently covered by the toolbar, with no visible
  // way to un-maximize/minimize/close. Reserve that strip instead of
  // covering it, matching how a real macOS window "zooms" to fill the
  // screen below the menu bar rather than over it. MacToolbar only renders
  // at md+ (desktop), which is also where isMobile (< 1024px) is false.
  const TOOLBAR_HEIGHT_PX = 32; // 2rem at the default 16px root font-size
  const TOOLBAR_HEIGHT = `${TOOLBAR_HEIGHT_PX}px`;

  // Mobile mode constraints
  const activeWidth = isMobile ? '100%' : (windowData.isMaximized ? '100vw' : size.width);
  const activeHeight = isMobile
    ? '100%'
    : (windowData.isMaximized ? `calc(100vh - ${TOOLBAR_HEIGHT})` : size.height);

  // The cascade formula below computes each window's un-dragged top/left as
  // "centered, offset by the cascade index". dragConstraints previously used
  // flat window.innerHeight/innerWidth bounds with no idea where that base
  // position actually was — a window whose base top already sat well below
  // the toolbar could still be dragged far enough up to tuck its title bar
  // (traffic lights included) behind the fixed MacToolbar, where it's
  // neither visible nor draggable anymore ("stuck"). Anchoring the
  // constraints to the same base position keeps the title bar always
  // reachable below the toolbar, while still allowing the normal amount of
  // slack on every other edge.
  const cascadeOffset = (windowData.cascade || 0) * 30;
  // Floored at the toolbar's height: on a short viewport, the raw
  // centering formula (50vh - height/2) can land above the toolbar on its
  // own, with no drag involved — the CSS "top" below applies the same
  // floor via max(), so this has to match or the drag constraints and the
  // resting position disagree about where "flush with the toolbar" is.
  const baseTop = Math.max(
    viewport.height / 2 - (windowData.defaultHeight || 500) / 2 + cascadeOffset,
    TOOLBAR_HEIGHT_PX
  );
  const baseLeft = viewport.width / 2 - (windowData.defaultWidth || 800) / 2 + cascadeOffset;
  const dragConstraints = typeof window !== 'undefined' ? {
    top: -(baseTop - TOOLBAR_HEIGHT_PX),
    left: -(baseLeft + (windowData.defaultWidth || 800) - 120),
    right: viewport.width - baseLeft - 120,
    bottom: viewport.height - baseTop - 80
  } : undefined;
  const position = windowData.position ?? { x: 0, y: 0 };

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
            // Controlled drag position: framer-motion animates to wherever
            // context says the window is, and onDragEnd below writes the
            // gesture's result straight back into context — so the value
            // here is always where the window already visually is (no
            // jump), and it now survives a minimize/restore within the
            // session (it's just React state, so a page refresh resets it).
            x: windowData.isMaximized ? 0 : position.x,
            y: windowData.isMaximized ? 0 : position.y,
          }}
          onDragEnd={(_e, info) => {
            if (windowData.isMaximized) return;
            updatePosition(id, { x: position.x + info.offset.x, y: position.y + info.offset.y });
          }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          onPointerDown={() => bringToFront(id)}
          className={`absolute flex flex-col pointer-events-auto bg-[#1c1c1e]/80 backdrop-blur-3xl overflow-hidden transition-shadow duration-300 ${
            isActive ? 'shadow-[0_30px_80px_rgba(0,0,0,0.6),_inset_0_1px_0_rgba(255,255,255,0.15)] border border-white/20' : 'shadow-[0_15px_40px_rgba(0,0,0,0.4),_inset_0_1px_0_rgba(255,255,255,0.1)] border border-white/10'
          } ${
            isMobile || windowData.isMaximized ? 'rounded-none left-0' : 'rounded-2xl'
          } ${
            isMobile ? 'top-0' : ''
          }`}
          style={{
            zIndex: windowData.zIndex,
            ...(!isMobile && windowData.isMaximized ? { top: TOOLBAR_HEIGHT } : {}),
            ...( !isMobile && !windowData.isMaximized ? {
              // Centered, then cascaded ~30px down-right per stacked window
              // (real-macOS cascade) — baseTop/baseLeft (computed above,
              // floored so the title bar can never start above the toolbar)
              // is the single source of truth shared with dragConstraints.
              top: `${baseTop}px`,
              left: `${baseLeft}px`
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

          {/* Title Bar (Draggable) — select-none + touch-none on the whole
              bar (not just the title text) stops the browser from starting
              a native text-selection or touch-scroll gesture the instant a
              drag begins anywhere on it, which was the source of the
              jitter/selection glitches. */}
          <div
            className="h-12 flex items-center px-4 relative shrink-0 z-40 select-none touch-none"
            onPointerDown={(e) => {
              if (!isMobile && !windowData.isMaximized) {
                dragControls.start(e);
              }
            }}
            onDoubleClick={() => !isMobile && toggleMaximize(id)}
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
