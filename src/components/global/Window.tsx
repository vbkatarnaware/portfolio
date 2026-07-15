import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';
import type { ReactNode } from 'react';

interface WindowProps {
  id: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: number;
  height?: number;
}

export default function Window({ id, title, isOpen, onClose, children, width = 800, height = 500 }: WindowProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.3, y: 300 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.3, y: 300 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.5 }}
          className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none origin-bottom"
        >
          <div 
            className="pointer-events-auto bg-[#1a1a1c]/35 backdrop-blur-[40px] rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.15),_0_30px_60px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden flex flex-col"
            style={{ width: `${width}px`, height: `${height}px`, maxWidth: '95vw', maxHeight: '85vh' }}
          >
            {/* Toolbar */}
            <div className="h-12 flex items-center px-4 relative shrink-0 z-10">
              {/* Traffic Lights */}
              <div className="flex gap-2 absolute left-4">
                <button 
                  onClick={onClose}
                  className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] border border-[#e0443e] flex items-center justify-center group"
                >
                  <X size={10} className="text-black/50 opacity-0 group-hover:opacity-100" />
                </button>
                <button className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border border-[#dea123] flex items-center justify-center group">
                  <Minus size={10} className="text-black/50 opacity-0 group-hover:opacity-100" />
                </button>
                <button className="w-3.5 h-3.5 rounded-full bg-[#27c93f] border border-[#1aab29] flex items-center justify-center group">
                  <Maximize2 size={8} className="text-black/50 opacity-0 group-hover:opacity-100" />
                </button>
              </div>
              
              {/* Title */}
              <div className="flex-1 text-center font-medium text-white/80 text-sm">
                {title}
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto">
              {children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
