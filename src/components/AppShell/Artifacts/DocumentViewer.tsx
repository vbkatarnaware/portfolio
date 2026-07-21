import React, { useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DocumentItem } from '../../../types/app';

interface DocumentViewerProps {
  doc: DocumentItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DocumentViewer({ doc, isOpen, onClose }: DocumentViewerProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === 'Escape') onClose();
  }, [isOpen, onClose]);

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

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md px-4 md:px-16 pt-16 pb-8"
          onClick={onClose}
        >
          {/* Header Controls */}
          <div className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-6 z-[200] bg-black/50 backdrop-blur-sm border-b border-white/10" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col">
              <h3 className="text-white font-medium text-sm md:text-base tracking-tight">{doc.title}</h3>
              <span className="text-white/50 text-[11px] md:text-xs uppercase tracking-wider">{doc.category}</span>
            </div>
            <div className="flex items-center gap-3">
              {doc.pdfUrl && (
                <a
                  href={doc.pdfUrl}
                  download
                  className="flex items-center gap-2 px-4 py-1.5 bg-[#0058d0] hover:bg-[#004bb5] text-white text-[13px] font-medium rounded-full transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Download size={14} />
                  <span className="hidden md:inline">Download PDF</span>
                </a>
              )}
              <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
            className="relative w-full max-w-5xl h-full mt-4 rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/20 bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            {doc.embedUrl ? (
              <iframe
                src={doc.embedUrl}
                className="w-full h-full border-none"
                allow="fullscreen"
              />
            ) : doc.pdfUrl ? (
              <object
                data={`${doc.pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                type="application/pdf"
                className="w-full h-full"
              >
                <div className="flex flex-col items-center justify-center h-full text-black/50 gap-4 p-8 text-center">
                  <p>Your browser doesn't support embedded PDFs.</p>
                  <a
                    href={doc.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-[#0058d0] text-white text-[14px] font-medium rounded-full"
                  >
                    Download PDF instead
                  </a>
                </div>
              </object>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-black/50 gap-4 p-8 text-center">
                <p>No document available to preview.</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
