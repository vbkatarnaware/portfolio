import React, { useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LightboxImage {
  src: string;
  alt: string;
  title: string;
  description: string;
}

interface LightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ images, currentIndex, isOpen, onClose, onNavigate }: LightboxProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
    if (e.key === 'ArrowRight') onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

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
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  // Framer motion relies on AnimatePresence to be at the root of conditionally rendered subtrees,
  // but since we want to unmount completely when closed, we'll wrap the whole component's return.
  return createPortal(
    <AnimatePresence>
      {isOpen && images.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Content */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/10 bg-black flex justify-center">
              <img
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                className="max-w-full max-h-[75vh] object-contain"
              />
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-white text-[16px] md:text-lg font-semibold tracking-tight">
                {images[currentIndex].title}
              </h3>
              <p className="text-white/60 text-[13px] md:text-sm mt-1 max-w-2xl mx-auto">
                {images[currentIndex].description}
              </p>
            </div>
          </motion.div>

          {/* Controls - rendered after content so they sit on top */}
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            aria-label="Close image viewer"
            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors z-[9999]"
          >
            <X size={24} aria-hidden="true" />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
                }}
                aria-label="Previous image"
                className="absolute left-4 md:left-6 p-3 text-white/50 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors z-[9999]"
              >
                <ChevronLeft size={28} aria-hidden="true" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
                }}
                aria-label="Next image"
                className="absolute right-4 md:right-6 p-3 text-white/50 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors z-[9999]"
              >
                <ChevronRight size={28} aria-hidden="true" />
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
