import React from 'react';
import type { AppContent } from '../../types/app';
import ProseSection from './ProseSection';

interface LessonsLearnedProps {
  content: AppContent;
}

export default function LessonsLearned({ content }: LessonsLearnedProps) {
  if (!content.lessonsLearned) {
    return <ProseSection title="Lessons Learned" paragraphs={content.lessons} />;
  }

  const { lessonsLearned } = content;

  return (
    <div className="max-w-3xl">
      <h2 className="text-[20px] font-semibold mb-6 tracking-tight text-white">Lessons Learned</h2>
      <div className="space-y-6">
        {lessonsLearned.biggestLesson && (
          <div className="space-y-1.5">
            <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Biggest Lesson</div>
            <p className="text-[14.5px] text-white/80 leading-relaxed max-w-[65ch]">{lessonsLearned.biggestLesson}</p>
          </div>
        )}
        {lessonsLearned.mistake && (
          <div className="space-y-1.5">
            <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Mistake Made</div>
            <p className="text-[14.5px] text-white/80 leading-relaxed max-w-[65ch]">{lessonsLearned.mistake}</p>
          </div>
        )}
        {lessonsLearned.differently && (
          <div className="space-y-1.5">
            <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">What I'd Do Differently</div>
            <p className="text-[14.5px] text-white/80 leading-relaxed max-w-[65ch]">{lessonsLearned.differently}</p>
          </div>
        )}
        {lessonsLearned.principle && (
          <div className="space-y-1.5">
            <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Principle I Still Believe</div>
            <p className="text-[14.5px] text-white/80 leading-relaxed max-w-[65ch]">{lessonsLearned.principle}</p>
          </div>
        )}
        {lessonsLearned.advice && (
          <div className="space-y-1.5">
            <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Advice to Future PMs</div>
            <p className="text-[14.5px] text-white/80 leading-relaxed max-w-[65ch]">{lessonsLearned.advice}</p>
          </div>
        )}
      </div>
    </div>
  );
}
