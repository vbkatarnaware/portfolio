import React, { useState } from 'react';
import { FileText, Download, Maximize2 } from 'lucide-react';
import type { DocumentItem } from '../../../types/app';
import PlaceholderCard from './PlaceholderCard';
import DocumentViewer from './DocumentViewer';

interface DocumentsProps {
  items?: DocumentItem[];
}

export default function Documents({ items }: DocumentsProps) {
  const [activeDoc, setActiveDoc] = useState<DocumentItem | null>(null);

  if (!items || items.length === 0) {
    return <PlaceholderCard icon={FileText} label="Documents" note="PRDs, BRDs, and case studies coming soon." />;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((doc, index) => (
          <div
            key={index}
            className="flex flex-col bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer group"
            onClick={() => setActiveDoc(doc)}
          >
            {/* Thumbnail Preview */}
            <div className="relative aspect-[4/3] bg-black/40 overflow-hidden flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <img
                src={doc.thumbnailSrc}
                alt={`${doc.title} Preview`}
                className="w-full h-full object-contain rounded-md shadow-2xl bg-white transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23ffffff'/%3E%3Cpath d='M150 100h100v10H150zm0 30h100v10H150zm0 30h100v10H150zm0 30h70v10h-70z' fill='%23e2e8f0'/%3E%3C/svg%3E";
                }}
              />
              
              <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-white text-[13px] font-medium shadow-lg border border-white/10">
                  <Maximize2 size={14} />
                  <span>Open Document</span>
                </div>
              </div>
            </div>

            {/* Metadata Footer */}
            <div className="p-4 flex flex-col gap-2 bg-black/20">
              <div>
                <span className="text-[#328df9] text-[11px] font-semibold uppercase tracking-wider">{doc.category}</span>
                <h4 className="text-white text-[15px] font-medium mt-0.5">{doc.title}</h4>
              </div>
              
              <p className="text-white/60 text-[13px] line-clamp-2 leading-relaxed">
                {doc.description}
              </p>

              <div className="flex items-center gap-3 mt-2 text-white/40 text-[12px] font-medium">
                <span className="flex items-center gap-1">
                  <FileText size={12} />
                  {doc.pages} pages
                </span>
                <span>•</span>
                <span>{doc.date}</span>
                <span>•</span>
                <span className="px-1.5 py-0.5 bg-white/5 rounded text-white/60">{doc.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <DocumentViewer
        doc={activeDoc}
        isOpen={activeDoc !== null}
        onClose={() => setActiveDoc(null)}
      />
    </>
  );
}
