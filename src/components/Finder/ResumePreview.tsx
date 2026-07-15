import React, { useState, useEffect, useRef } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up the worker for react-pdf to avoid Vite resolution issues
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface ResumePreviewProps {
  pdfUrl: string;
}

export default function ResumePreview({ pdfUrl }: ResumePreviewProps) {
  const [numPages, setNumPages] = useState<number>();
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Resize observer to dynamically scale the PDF based on the container width
    const observer = new ResizeObserver((entries) => {
      if (entries[0] && entries[0].contentRect.width > 0) {
        // Leave 64px total margin for equal padding (32px left/right)
        setContainerWidth(entries[0].contentRect.width - 64);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  // The max width for the PDF so it doesn't get ridiculously large on huge monitors
  const maxPdfWidth = isZoomed ? 2000 : 900;
  const pdfScaleWidth = containerWidth > 0 ? Math.min(containerWidth, maxPdfWidth) : undefined;

  return (
    <div className="w-full h-full bg-[#f2f2f7] overflow-y-auto overflow-x-hidden" ref={containerRef}>
      <div className="flex flex-col items-center justify-center p-8 gap-8 min-h-full">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="text-black/50 text-[13px] font-medium h-40 flex items-center justify-center">
              Loading document...
            </div>
          }
          error={
            <div className="text-[#ff3b30] text-[13px] font-medium h-40 flex items-center justify-center">
              Failed to load PDF.
            </div>
          }
        >
          {numPages &&
            Array.from(new Array(numPages), (el, index) => (
              <div 
                key={`page_${index + 1}`}
                onDoubleClick={() => setIsZoomed(!isZoomed)}
                className="rounded-md overflow-hidden bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-black/5 transition-all duration-300 select-none"
              >
                <Page
                  pageNumber={index + 1}
                  width={pdfScaleWidth}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  loading={<div className="bg-white" style={{ width: pdfScaleWidth || 600, height: (pdfScaleWidth || 600) * 1.414 }} />}
                />
              </div>
            ))}
        </Document>
      </div>
    </div>
  );
}
