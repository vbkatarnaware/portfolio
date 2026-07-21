import React from 'react';
import { Mail, AppWindow, MapPin, CalendarDays } from 'lucide-react';
import { FiLinkedin } from 'react-icons/fi';
import vipulImg from '../../assets/images/vipul-picture.jpg';

export default function ContactView() {
  return (
    <div className="max-w-2xl text-[14px] font-sans pb-12">
      {/* Avatar */}
      <div className="w-20 h-20 shrink-0 mb-6">
        <div className="w-full h-full rounded-full overflow-hidden">
          <img 
            src={vipulImg.src} 
            alt="Vipul Katarnaware" 
            className="w-full h-full object-cover" 
          />
        </div>
      </div>

      <h1 className="text-[28px] font-semibold tracking-tight mb-2 text-white">Contact</h1>
      <p className="text-white/60 mb-10 max-w-[50ch] text-[15px] font-medium leading-relaxed">
        Let's build something people remember.<br />
        <span className="text-white/40 mt-1 block font-normal">
          Open to product, AI, startup, and collaboration conversations.
        </span>
      </p>

      <div className="flex flex-col gap-4 mb-8">
        
        {/* Primary Contact: Email */}
        <a
          href="mailto:vbkatarnaware@gmail.com"
          className="flex items-center gap-4 p-4 rounded-xl bg-[#0058d0]/10 hover:bg-[#0058d0]/20 transition-colors group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0058d0] focus:ring-offset-2 focus:ring-offset-[#1c1c1e]"
          aria-label="Send Email to vbkatarnaware@gmail.com"
        >
          <div className="w-10 h-10 rounded-full bg-[#0058d0]/20 flex items-center justify-center text-[#328df9] group-hover:bg-[#0058d0] group-hover:text-white transition-colors shrink-0">
            <Mail size={18} aria-hidden="true" />
          </div>
          <div className="flex-1">
            <div className="text-white font-medium text-[15px]">vbkatarnaware@gmail.com</div>
          </div>
        </a>

        {/* Book a call: Calendly */}
        <a
          href="https://calendly.com/katarnaware/videocall?month=2026-07"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-[#1c1c1e]"
          aria-label="Book a call via Calendly"
        >
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 group-hover:bg-white/10 group-hover:text-white transition-colors shrink-0">
            <CalendarDays size={18} aria-hidden="true" />
          </div>
          <div className="flex-1">
            <div className="text-white/90 font-medium text-[15px]">Book a call</div>
          </div>
        </a>

        {/* Secondary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a 
            href="https://linkedin.com/in/vipul-katarnaware" 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-[#1c1c1e]"
            aria-label="Open LinkedIn Profile"
          >
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 group-hover:bg-white/10 group-hover:text-white transition-colors shrink-0">
              <FiLinkedin size={18} aria-hidden="true" />
            </div>
            <div className="flex-1 truncate">
              <div className="text-white/90 font-medium truncate">linkedin.com/in/vipul-katarnaware</div>
            </div>
          </a>

          <a
            href="https://github.com/vbkatarnaware"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-[#1c1c1e]"
            aria-label="Open GitHub Profile"
          >
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 group-hover:bg-white/10 group-hover:text-white transition-colors shrink-0">
              <AppWindow size={18} aria-hidden="true" />
            </div>
            <div className="flex-1 truncate">
              <div className="text-white/90 font-medium truncate">github.com/vbkatarnaware</div>
            </div>
          </a>

          <a 
            href="https://maps.google.com/?q=Navi+Mumbai"
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-[#1c1c1e] sm:col-span-2"
            aria-label="View Location on Google Maps"
          >
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 group-hover:bg-white/10 group-hover:text-white transition-colors shrink-0">
              <MapPin size={18} aria-hidden="true" />
            </div>
            <div className="flex-1 truncate">
              <div className="text-white/90 font-medium truncate">Navi Mumbai, India</div>
            </div>
          </a>
        </div>

      </div>
    </div>
  );
}
