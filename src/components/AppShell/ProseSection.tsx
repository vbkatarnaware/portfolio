import React from 'react';

interface ProseSectionProps {
  title: string;
  paragraphs?: string[];
}

// Shared renderer for every paragraph-list section (Overview, Problem/Role,
// Discovery & Decisions, Cross-functional, Lessons) — one component instead
// of five near-identical ones.
export default function ProseSection({ title, paragraphs }: ProseSectionProps) {
  if (!paragraphs || paragraphs.length === 0) return null;
  return (
    <div>
      <h2 className="text-[20px] font-semibold mb-6 tracking-tight text-white">{title}</h2>
      <div className="space-y-5">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-[14.5px] leading-relaxed text-white/80 whitespace-pre-wrap max-w-[65ch]">
            {/* Simple bold parser for **text** */}
            {p.split(/(\*\*.*?\*\*)/g).map((part, index) => 
              part.startsWith('**') && part.endsWith('**') 
                ? <strong key={index} className="text-white font-semibold">{part.slice(2, -2)}</strong> 
                : part
            )}
          </p>
        ))}
      </div>
    </div>
  );
}
