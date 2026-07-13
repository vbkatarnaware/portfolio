import { useState } from 'react';
import { User, FileText, Briefcase, Code, Award, Mail } from 'lucide-react';

const SIDEBAR_ITEMS = [
  { id: 'about', label: 'About Me', icon: User },
  { id: 'resume', label: 'Resume', icon: FileText },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'achievements', label: 'Achievements', icon: Award },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export default function FinderApp() {
  const [activeTab, setActiveTab] = useState('about');

  return (
    <div className="flex h-full text-white/90">
      {/* Sidebar */}
      <div className="w-48 bg-black/40 border-r border-white/10 p-3 hidden md:block backdrop-blur-3xl shrink-0">
        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2 px-3 mt-2">Explore Me</h3>
        <ul className="space-y-1">
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2.5 text-[13px] px-3 py-1.5 rounded-md cursor-pointer transition-colors ${
                  isActive ? 'bg-white/10 text-white font-medium' : 'text-white/70 hover:bg-white/5'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-white' : 'text-white/60'} />
                {item.label}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-y-auto bg-[#1c1c1e]/50 backdrop-blur-3xl">
        {activeTab === 'about' && (
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h1 className="text-3xl font-bold mb-6">About Me</h1>
            <p className="text-lg text-white/70 leading-relaxed mb-4">
              I'm Vipul Katarnaware. I build products that sit at the intersection of powerful utility and elegant design. 
            </p>
            <p className="text-lg text-white/70 leading-relaxed mb-4">
              My philosophy is simple: the best products disappear. When software feels like a natural extension of thought, when you stop noticing the interface and just get the work done—that's when I know I've succeeded.
            </p>
            <p className="text-lg text-white/70 leading-relaxed">
              I am currently focused on building AI-native products that augment human creativity rather than replacing it.
            </p>
          </div>
        )}

        {activeTab === 'resume' && (
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h1 className="text-3xl font-bold mb-6">Resume</h1>
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center">
              <FileText size={48} className="text-white/40 mb-4" />
              <h2 className="text-xl font-medium mb-2">VipulKatarnaware_Resume.pdf</h2>
              <p className="text-sm text-white/50 mb-6">142 KB · PDF Document</p>
              <button className="px-4 py-2 bg-white text-black rounded-lg font-medium text-sm hover:scale-105 transition-transform">
                Download Resume
              </button>
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h1 className="text-3xl font-bold mb-8">Experience</h1>
            
            <div className="space-y-8">
              <div className="relative pl-6 border-l border-white/10">
                <div className="absolute w-3 h-3 bg-white rounded-full -left-[1.5px] top-1.5 ring-4 ring-black" />
                <h3 className="text-xl font-bold">Product Manager & Founder</h3>
                <p className="text-white/50 text-sm mb-3">QRapid · 2023 - Present</p>
                <p className="text-white/70 leading-relaxed text-sm">
                  Built and scaled a contactless ordering platform from 0 to 40+ restaurants. Processed over ₹1Cr+ in transactions. Managed the entire product lifecycle from ideation to deployment.
                </p>
              </div>

              <div className="relative pl-6 border-l border-white/10">
                <div className="absolute w-3 h-3 bg-white/30 rounded-full -left-[1.5px] top-1.5 ring-4 ring-black" />
                <h3 className="text-xl font-bold">Senior Product Builder</h3>
                <p className="text-white/50 text-sm mb-3">CareerOS · 2021 - 2023</p>
                <p className="text-white/70 leading-relaxed text-sm">
                  Led the development of automated job tracking and application workflows. Increased user retention by 40% through a complete redesign of the core user experience.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h1 className="text-3xl font-bold mb-8">Skills</h1>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">Product Management</h3>
                <ul className="space-y-2 text-white/80">
                  <li>Product Strategy</li>
                  <li>User Research</li>
                  <li>Roadmapping</li>
                  <li>Go-To-Market</li>
                  <li>Agile Methodologies</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">Engineering</h3>
                <ul className="space-y-2 text-white/80">
                  <li>React & Next.js</li>
                  <li>TypeScript</li>
                  <li>Node.js</li>
                  <li>Tailwind CSS</li>
                  <li>System Architecture</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h1 className="text-3xl font-bold mb-6">Achievements</h1>
            <div className="grid gap-4">
              <div className="p-4 bg-white/5 border border-white/10 rounded-lg flex gap-4 items-start">
                <div className="p-2 bg-yellow-500/20 text-yellow-500 rounded-md shrink-0">
                  <Award size={20} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Product of the Day</h3>
                  <p className="text-sm text-white/60">Product Hunt · Ranked #1 for CareerOS launch.</p>
                </div>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-lg flex gap-4 items-start">
                <div className="p-2 bg-blue-500/20 text-blue-500 rounded-md shrink-0">
                  <Award size={20} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">₹1Cr+ Transaction Milestone</h3>
                  <p className="text-sm text-white/60">QRapid · Hit first major revenue milestone within 8 months.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h1 className="text-3xl font-bold mb-6">Contact</h1>
            <p className="text-lg text-white/70 mb-8">
              I'm always open to discussing product design, startups, or interesting AI applications.
            </p>
            <div className="space-y-4">
              <a href="mailto:vipul@example.com" className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                <Mail className="text-white/50" />
                <span>vipul@example.com</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                <User className="text-white/50" />
                <span>LinkedIn Profile</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
