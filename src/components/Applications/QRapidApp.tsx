import { ArrowUpRight } from 'lucide-react';
import customIconImg from '../../assets/images/custom-icon.png';

export default function QRapidApp() {
  return (
    <div className="flex flex-col h-full text-white/90 bg-[#1c1c1e] overflow-y-auto">
      {/* Hero Section */}
      <div className="relative w-full h-[280px] shrink-0 bg-gradient-to-b from-[#0058d0]/20 to-transparent flex items-end p-8 border-b border-white/5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1e] via-[#1c1c1e]/50 to-transparent"></div>
        
        <div className="relative z-10 flex items-end gap-6 w-full max-w-4xl mx-auto">
          <div className="w-24 h-24 rounded-[22px] overflow-hidden shadow-2xl border border-white/10 shrink-0 bg-white">
            <img src={customIconImg.src} alt="QRapid" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 pb-1">
            <h1 className="text-[32px] font-bold tracking-tight mb-1">QRapid</h1>
            <p className="text-[15px] text-white/60 font-medium">Contactless POS & Restaurant Management</p>
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
            <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-1">GMV Processed</span>
            <span className="text-2xl font-bold tracking-tight text-white">₹1Cr+</span>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex flex-col justify-center items-center text-center">
            <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-1">Restaurants</span>
            <span className="text-2xl font-bold tracking-tight text-white">40+</span>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex flex-col justify-center items-center text-center">
            <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-1">My Role</span>
            <span className="text-[15px] font-semibold text-white">Founder & PM</span>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex flex-col justify-center items-center text-center">
            <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-1">Timeline</span>
            <span className="text-[15px] font-semibold text-white">2023 - Present</span>
          </div>
        </div>

        {/* Overview */}
        <div>
          <h2 className="text-[20px] font-semibold mb-4 tracking-tight">The Problem</h2>
          <p className="text-[15px] text-white/70 leading-[1.6]">
            Traditional restaurant ordering is highly inefficient. Waitstaff spend disproportionate amounts of time taking orders and processing payments, leading to severe bottlenecks during peak hours, human error, and poor customer experiences.
          </p>
        </div>

        <div>
          <h2 className="text-[20px] font-semibold mb-4 tracking-tight">The Solution</h2>
          <p className="text-[15px] text-white/70 leading-[1.6]">
            QRapid eliminates the friction by putting the entire Point of Sale directly into the customer's pocket. By scanning a table QR code, diners can view a live menu, place orders directly to the kitchen display system (KDS), and checkout seamlessly. This reduces table turnaround time by 30% and empowers restaurants to operate with leaner front-of-house teams.
          </p>
        </div>

        {/* Tech Stack */}
        <div>
          <h2 className="text-[20px] font-semibold mb-4 tracking-tight">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Stripe', 'WebSockets'].map(tech => (
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
