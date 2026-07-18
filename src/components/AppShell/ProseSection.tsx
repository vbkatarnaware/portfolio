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
      <h2 className="text-[18px] md:text-[20px] font-semibold mb-4 tracking-tight">{title}</h2>
      <div className="space-y-3">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-[14px] md:text-[15px] text-white/70 leading-[1.6]">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
