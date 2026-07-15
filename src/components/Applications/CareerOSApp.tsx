import { ArrowUpRight } from 'lucide-react';
import careerosImg from '../../assets/images/careeros.png';

export default function CareerOSApp() {
  return (
    <div className="flex flex-col h-full text-white/90 bg-[#1c1c1e] overflow-y-auto">
      {/* Hero Section */}
      <div className="relative w-full h-[280px] shrink-0 bg-gradient-to-b from-[#27c93f]/20 to-transparent flex items-end p-8 border-b border-white/5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1e] via-[#1c1c1e]/50 to-transparent"></div>
        
        <div className="relative z-10 flex items-end gap-6 w-full max-w-4xl mx-auto">
          <div className="w-24 h-24 rounded-[22px] overflow-hidden shadow-2xl border border-white/10 shrink-0 bg-white">
            <img src={careerosImg.src} alt="CareerOS" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 pb-1">
            <h1 className="text-[32px] font-bold tracking-tight mb-1">CareerOS</h1>
            <p className="text-[15px] text-white/60 font-medium">Job Application Tracker & Workflow</p>
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
            <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-1">Users</span>
            <span className="text-2xl font-bold tracking-tight text-white">5k+</span>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex flex-col justify-center items-center text-center">
            <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-1">Applications Tracked</span>
            <span className="text-2xl font-bold tracking-tight text-white">100k+</span>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex flex-col justify-center items-center text-center">
            <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-1">My Role</span>
            <span className="text-[15px] font-semibold text-white">PM & Engineer</span>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex flex-col justify-center items-center text-center">
            <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-1">Status</span>
            <span className="text-[15px] font-semibold text-white">Acquired</span>
          </div>
        </div>

        {/* Overview */}
        <div>
          <h2 className="text-[20px] font-semibold mb-4 tracking-tight">The Problem</h2>
          <p className="text-[15px] text-white/70 leading-[1.6]">
            Job hunting is a chaotic, decentralized process. Candidates juggle spreadsheets, endless email threads, and disjointed company portals, resulting in missed interviews, dropped follow-ups, and overwhelming cognitive load.
          </p>
        </div>

        <div>
          <h2 className="text-[20px] font-semibold mb-4 tracking-tight">The Solution</h2>
          <p className="text-[15px] text-white/70 leading-[1.6]">
            CareerOS centralizes the entire hiring workflow. By replacing fragmented spreadsheets with a dedicated kanban board, automated follow-up reminders, and integrated resume tailoring, candidates regain control of their job search pipeline. It transforms job hunting from an administrative nightmare into a streamlined operation.
          </p>
        </div>

        {/* Tech Stack */}
        <div>
          <h2 className="text-[20px] font-semibold mb-4 tracking-tight">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {['React', 'Supabase', 'Tailwind CSS', 'Framer Motion', 'Vercel'].map(tech => (
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
