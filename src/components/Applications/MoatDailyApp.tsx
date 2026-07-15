import { ArrowUpRight } from 'lucide-react';
import moatdailyImg from '../../assets/images/moatdaily.png';

export default function MoatDailyApp() {
  return (
    <div className="flex flex-col h-full text-white/90 bg-[#1c1c1e] overflow-y-auto">
      {/* Hero Section */}
      <div className="relative w-full h-[280px] shrink-0 bg-gradient-to-b from-[#ff5f56]/20 to-transparent flex items-end p-8 border-b border-white/5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1e] via-[#1c1c1e]/50 to-transparent"></div>
        
        <div className="relative z-10 flex items-end gap-6 w-full max-w-4xl mx-auto">
          <div className="w-24 h-24 rounded-[22px] overflow-hidden shadow-2xl border border-white/10 shrink-0 bg-white">
            <img src={moatdailyImg.src} alt="MoatDaily" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 pb-1">
            <h1 className="text-[32px] font-bold tracking-tight mb-1">MoatDaily</h1>
            <p className="text-[15px] text-white/60 font-medium">Financial Intelligence & Research</p>
          </div>
          <div className="flex gap-3 pb-2">
            <a href="#" className="h-8 px-4 bg-white text-black rounded-full text-[13px] font-semibold flex items-center justify-center hover:bg-white/90 transition-colors shadow-lg">
              GET
            </a>
            <a href="#" className="h-8 w-8 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10">
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 w-full max-w-4xl mx-auto p-8 space-y-12">
        
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex flex-col justify-center items-center text-center">
            <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-1">Subscribers</span>
            <span className="text-2xl font-bold tracking-tight text-white">12k+</span>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex flex-col justify-center items-center text-center">
            <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-1">Open Rate</span>
            <span className="text-2xl font-bold tracking-tight text-white">42%</span>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex flex-col justify-center items-center text-center">
            <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-1">My Role</span>
            <span className="text-[15px] font-semibold text-white">Creator</span>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex flex-col justify-center items-center text-center">
            <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-1">Status</span>
            <span className="text-[15px] font-semibold text-white">Active</span>
          </div>
        </div>

        {/* Overview */}
        <div>
          <h2 className="text-[20px] font-semibold mb-4 tracking-tight">The Problem</h2>
          <p className="text-[15px] text-white/70 leading-[1.6]">
            Retail investors are bombarded with noise. Between clickbait financial news, dense 10-K filings, and conflicting analyst reports, extracting actionable, high-signal market intelligence is incredibly time-consuming and often overwhelming.
          </p>
        </div>

        <div>
          <h2 className="text-[20px] font-semibold mb-4 tracking-tight">The Solution</h2>
          <p className="text-[15px] text-white/70 leading-[1.6]">
            MoatDaily distills complex financial narratives into brief, high-impact newsletters. By focusing exclusively on fundamental business moats and underlying economic mechanics, it delivers deep insights without the fluff. Readers get hedge-fund level analysis packaged in a clear, accessible 5-minute daily read.
          </p>
        </div>

        {/* Tech Stack */}
        <div>
          <h2 className="text-[20px] font-semibold mb-4 tracking-tight">Stack</h2>
          <div className="flex flex-wrap gap-2">
            {['Ghost', 'PostgreSQL', 'Stripe', 'Figma', 'Zapier'].map(tech => (
              <span key={tech} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[13px] font-medium text-white/80">
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
