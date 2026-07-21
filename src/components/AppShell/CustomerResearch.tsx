import React, { useState } from 'react';
import type { AppContent } from '../../types/app';
import ProseSection from './ProseSection';
import { CheckCircle2, Eye, Lightbulb, Hammer, TrendingUp, ChevronRight, Target, AlertCircle } from 'lucide-react';

interface CustomerResearchProps {
  content: AppContent;
}

// Shared "Get Info" style key-value row — used for both the hero metrics and
// the closing summary so the two read as one consistent native list pattern
// instead of two different stat treatments.
function KeyValueRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between py-2.5 text-[14.5px]">
      <span className="text-[13px] font-medium text-white/50">{label}</span>
      <span className="font-semibold text-white tabular-nums">{value}</span>
    </div>
  );
}

// Native disclosure row matching the exact layout of DecisionLog for consistency
function DiscoveryRow({ discovery }: { discovery: { title: string; description: string; influencedDecision: string } }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-white/[0.04] transition-colors text-left focus:outline-none"
      >
        <h4 className="text-[14.5px] font-medium text-white/90 leading-snug flex-1 pr-4">
          {discovery.title}
        </h4>
        <div className="flex items-center shrink-0">
          <ChevronRight
            size={16}
            className={`text-white/30 transition-transform duration-200 shrink-0 ${open ? 'rotate-90' : ''}`}
          />
        </div>
      </button>

      {open && (
        <div className="px-5 pb-6 pt-5 bg-black/20 border-t border-white/5 inner-shadow-sm">
          <div className="space-y-5 max-w-2xl">
            <p className="text-[14.5px] text-white/80 leading-relaxed max-w-[65ch]">
              {discovery.description}
            </p>

            <div className="space-y-1.5 pt-2">
              <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Influenced</div>
              <span className="inline-flex items-center gap-1.5 text-[13.5px] text-white/80 font-medium">
                <CheckCircle2 size={14} className="text-[#27c93f]/70 shrink-0" />
                {discovery.influencedDecision}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const PIPELINE_STAGES = [
  { key: 'research' as const, label: 'Observation', icon: Eye },
  { key: 'decision' as const, label: 'Decision', icon: Lightbulb },
  { key: 'feature' as const, label: 'Feature Built', icon: Hammer },
  { key: 'outcome' as const, label: 'Outcome', icon: TrendingUp },
];

export default function CustomerResearch({ content }: CustomerResearchProps) {
  if (!content.customerResearch) {
    return <ProseSection title="Discovery" paragraphs={content.discovery} />;
  }

  const cr = content.customerResearch;

  return (
    <div className="space-y-14 pb-12 max-w-4xl">
      {/* 1. Hero + Metrics as an inset "Get Info" style list */}
      <section>
        <h2 className="text-[20px] font-semibold mb-6 tracking-tight text-white">{cr.hero.title}</h2>
        <p className="text-[14.5px] leading-relaxed text-white/80 mb-6 max-w-[65ch]">
          {cr.hero.description}
        </p>

        <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl shadow-sm px-5 py-2">
          <div className="divide-y divide-white/[0.05]">
            {cr.hero.metrics.map((metric, idx) => (
              <KeyValueRow key={idx} label={metric.label} value={metric.value} />
            ))}
          </div>
        </div>
      </section>

      {/* 2. Biggest Discoveries — native disclosure list matching Decision Log */}
      <section>
        <h2 className="text-[20px] font-semibold mb-6 tracking-tight text-white">Biggest Discoveries</h2>
        <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl shadow-sm overflow-hidden">
          {cr.biggestDiscoveries.map((discovery, idx) => (
            <DiscoveryRow key={idx} discovery={discovery} />
          ))}
        </div>
      </section>

      {/* 3. Research Pipeline — responsive data table */}
      <section>
        <h2 className="text-[20px] font-semibold mb-6 tracking-tight text-white">Research to Product Pipeline</h2>

        <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl shadow-sm overflow-hidden">
          {/* Table Header - Only visible on large screens */}
          <div className="hidden lg:grid grid-cols-4 gap-x-6 px-4 py-3 border-b border-white/[0.05] bg-white/[0.02]">
            {PIPELINE_STAGES.map((stage) => {
              const Icon = stage.icon;
              return (
                <div key={stage.key} className="flex items-center gap-2 text-[11px] font-medium text-white/40 uppercase tracking-wider">
                  <Icon size={12} />
                  {stage.label}
                </div>
              );
            })}
          </div>

          {/* Table Rows */}
          <div className="flex flex-col divide-y divide-white/[0.05]">
            {cr.visualMapping.map((map, idx) => (
              <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-x-6 py-4 px-4 hover:bg-white/[0.02] transition-colors items-start">
                {PIPELINE_STAGES.map((stage) => {
                  const isOutcome = stage.key === 'outcome';
                  const Icon = stage.icon;
                  return (
                    <div key={stage.key} className="space-y-1.5">
                      {/* Inline label for small screens */}
                      <div className="flex lg:hidden items-center gap-1.5 text-[10px] font-medium text-white/40 uppercase tracking-wider">
                        <Icon size={10} />
                        {stage.label}
                      </div>
                      <span className={`block text-[13px] leading-relaxed ${isOutcome ? 'text-white/90 font-medium' : 'text-white/70'}`}>
                        {map[stage.key]}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Target Personas — macOS Settings Group Layout */}
      <section>
        <h2 className="text-[20px] font-semibold mb-6 tracking-tight text-white">Target Personas</h2>
        <div className="space-y-8">
          {cr.personas.map((persona, idx) => (
            <div key={idx} className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <Target size={18} className="text-white/40" />
                <h4 className="text-[18px] font-semibold text-white/90 tracking-tight">{persona.role}</h4>
              </div>

              <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl shadow-sm overflow-hidden">
                {/* Goals Row */}
                <div className="p-4 border-b border-white/[0.05] flex flex-col sm:flex-row sm:gap-6">
                  <div className="sm:w-32 shrink-0">
                    <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-2 sm:mb-0">Goals</div>
                  </div>
                  <div className="flex-1">
                    <ul className="space-y-2 text-[14.5px] text-white/80">
                      {persona.goals.map((g, i) => (
                        <li key={i} className="flex gap-3 items-start">
                          <span className="text-white/20 select-none">—</span>
                          <span className="leading-relaxed">{g}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Pain Points Row */}
                <div className="p-4 border-b border-white/[0.05] flex flex-col sm:flex-row sm:gap-6">
                  <div className="sm:w-32 shrink-0">
                    <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-2 sm:mb-0">Pain Points</div>
                  </div>
                  <div className="flex-1">
                    <ul className="space-y-2 text-[14.5px] text-white/80">
                      {persona.painPoints.map((p, i) => (
                        <li key={i} className="flex gap-3 items-start">
                          <span className="text-white/20 select-none">—</span>
                          <span className="leading-relaxed">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Influenced Row */}
                <div className="p-4 flex flex-col sm:flex-row sm:gap-6">
                  <div className="sm:w-32 shrink-0">
                    <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-2 sm:mb-0">Influenced</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-[14.5px] text-white/90 font-medium leading-relaxed">
                      {persona.decisionInfluence}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Jobs To Be Done — native macOS typography without cards */}
      <section>
        <h2 className="text-[20px] font-semibold mb-6 tracking-tight text-white">Jobs To Be Done</h2>
        <div className="divide-y divide-white/[0.05]">
          {cr.jtbd.map((job, idx) => {
            // Clean up the raw strings to avoid double-punctuation and duplicate triggers
            const whenClean = job.when.replace(/^When\s+/i, '').replace(/,\s*$/, '');
            const iWantClean = job.iWant.replace(/^I want( to)?\s+/i, '').replace(/,\s*$/, '');
            const soICanClean = job.soICan.replace(/^So I can\s+/i, '').replace(/\.\s*$/, '');

            return (
              <div key={idx} className="py-8 first:pt-0">
                <div className="space-y-4">
                  {/* When Row */}
                  <div className="flex flex-col sm:flex-row sm:gap-6">
                    <div className="sm:w-28 shrink-0">
                      <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-2 sm:mb-0 mt-[2px]">When</div>
                    </div>
                    <div className="flex-1">
                      <p className="text-[14.5px] text-white/80 leading-relaxed max-w-[65ch]">{whenClean}</p>
                    </div>
                  </div>
                  
                  {/* I Want To Row */}
                  <div className="flex flex-col sm:flex-row sm:gap-6">
                    <div className="sm:w-28 shrink-0">
                      <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-2 sm:mb-0 mt-[2px]">I Want To</div>
                    </div>
                    <div className="flex-1">
                      <p className="text-[14.5px] text-white/80 leading-relaxed max-w-[65ch]">{iWantClean}</p>
                    </div>
                  </div>

                  {/* So I Can Row */}
                  <div className="flex flex-col sm:flex-row sm:gap-6">
                    <div className="sm:w-28 shrink-0">
                      <div className="text-[11px] font-semibold text-[#27c93f]/80 uppercase tracking-wider mb-2 sm:mb-0 mt-[2px]">So I Can</div>
                    </div>
                    <div className="flex-1">
                      <p className="text-[14.5px] text-[#27c93f]/90 font-medium leading-relaxed max-w-[65ch]">{soICanClean}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Methods & Summary — grouped list beside a matching key-value list */}
      <section className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="space-y-4">
          <h2 className="text-[20px] font-semibold mb-6 tracking-tight text-white">Supporting Methods</h2>
          <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl shadow-sm px-5 py-2">
            <ul className="divide-y divide-white/[0.05]">
              {cr.methods.map((method, idx) => (
                <li key={idx} className="py-2.5 text-[14.5px] text-white/80">
                  {method}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-[20px] font-semibold mb-6 tracking-tight text-white">Summary</h2>
          <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl shadow-sm px-5 py-2">
            <div className="divide-y divide-white/[0.05]">
              {cr.bottomSummary.map((stat, idx) => (
                <KeyValueRow key={idx} label={stat.label} value={stat.value} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Voice of Customer — native typography without decorative marks */}
      {cr.quotes.length > 0 && (
        <section>
          <h2 className="text-[20px] font-semibold mb-6 tracking-tight text-white">Voice of Customer</h2>
          <div className="divide-y divide-white/5">
            {cr.quotes.map((quote, idx) => (
              <div key={idx} className="py-7 first:pt-2">
                <p className="text-[16px] md:text-[18px] text-white/90 leading-relaxed tracking-tight mb-3 max-w-[65ch]">
                  &ldquo;{quote.text}&rdquo;
                </p>
                <div className="text-[12px] font-medium text-white/40 uppercase tracking-wider">
                  {quote.attribution}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
