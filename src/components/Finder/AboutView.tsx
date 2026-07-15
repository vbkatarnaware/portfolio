import React from 'react';
import vipulImg from '../../assets/images/vipul-picture.jpg';

export default function AboutView() {
  return (
    <article className="max-w-[70ch] text-[15px] font-sans">
      <header className="flex items-center gap-6 mb-10">
        <div className="w-24 h-24 rounded-full p-1 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)] shrink-0 bg-black/20">
          <div className="w-full h-full rounded-full overflow-hidden">
            <img 
              src={vipulImg.src} 
              alt="Vipul Katarnaware - Senior Product Manager" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
        <div>
          <h1 className="text-[28px] font-semibold tracking-tight text-white mb-1">
            Vipul Katarnaware
          </h1>
          <p className="text-white/90 font-semibold text-[15px]">
            AI-Native Product Manager • Founder
          </p>
          <p className="text-white/60 font-medium text-[13px] mt-1 leading-relaxed max-w-[50ch]">
            I build AI-native products that disappear into the workflow. My focus isn't AI for its own sake. It's using it to solve real problems with sharp product thinking and founder instinct.
          </p>
        </div>
      </header>
      
      <div className="space-y-6 text-white/70 leading-relaxed text-[14px]">
        <p className="text-white/90 font-medium text-[15px]">
          Most Product Managers write specs. I write software.
        </p>
        <p>
          I am a founder-turned-PM who builds AI-native systems end to end. I don't wait for engineering bandwidth. I build the agentic layers, speak directly to the customer, and turn friction into revenue. 
        </p>
        <p>
          At <strong>QRapid</strong>, I built a restaurant POS from scratch and scaled it to $240,000+ in processed volume. At <strong>ICICI Bank</strong>, I engineered geospatial scoring models (GeoIQ) in SQL that shaped credit underwriting for millions. 
        </p>
        <p>
          I specialize in 0-to-1 product development, LLM orchestration (Claude, OpenAI), and workflow automation. My philosophy is simple: technology should disappear, leaving only the solution.
        </p>
      </div>
    </article>
  );
}
