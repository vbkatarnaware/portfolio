import React, { useState } from 'react';
import { Mail, AppWindow, MapPin, CalendarDays, Copy, Check, FileText } from 'lucide-react';
import { FiLinkedin } from 'react-icons/fi';
import vipulImg from '../../assets/images/vipul-picture.jpg';

const EMAIL = 'vbkatarnaware@gmail.com';
const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`;

export default function ContactView() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // Clipboard API can be unavailable (older browsers, non-HTTPS) —
      // the toast still confirms intent even if the copy itself silently no-ops.
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl text-[14px] font-sans pb-12 relative">
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

        {/* Primary Contact: Email address + Compose / Copy actions */}
        <div className="p-4 rounded-xl bg-[#0058d0]/10 border border-[#0058d0]/20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#0058d0]/20 flex items-center justify-center text-[#328df9] shrink-0">
              <Mail size={18} aria-hidden="true" />
            </div>
            <div className="flex-1">
              <div className="text-white font-medium text-[15px]">{EMAIL}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={GMAIL_COMPOSE_URL}
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-center px-4 py-2 bg-[#0058d0] hover:bg-[#0058d0]/85 text-white text-[13.5px] font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-[#1c1c1e]"
              aria-label={`Compose an email to ${EMAIL} in Gmail`}
            >
              Compose Email
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="px-3.5 py-2 bg-white/5 hover:bg-white/10 text-white/80 rounded-lg transition-colors flex items-center gap-2 text-[13.5px] font-medium focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-[#1c1c1e]"
              aria-label="Copy email address to clipboard"
            >
              {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

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
            href="/Master_Product_Manager_Resume.pdf"
            download
            className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-[#1c1c1e]"
            aria-label="Download resume PDF"
          >
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 group-hover:bg-white/10 group-hover:text-white transition-colors shrink-0">
              <FileText size={18} aria-hidden="true" />
            </div>
            <div className="flex-1 truncate">
              <div className="text-white/90 font-medium truncate">Download Resume</div>
            </div>
          </a>

          <a
            href="https://maps.google.com/?q=Navi+Mumbai"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-[#1c1c1e]"
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

      {/* Copy confirmation toast */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2.5 bg-[#1c1c1e] border border-white/10 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-white/90 text-[13px] font-medium flex items-center gap-2 transition-all duration-300 z-[200] ${
          copied ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        <Check size={14} className="text-[#27c93f]" aria-hidden="true" />
        Email address copied
      </div>
    </div>
  );
}
