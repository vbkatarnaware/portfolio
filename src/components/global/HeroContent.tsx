import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useStartupPhase } from '../../context/StartupContext';

const ROTATING_MESSAGES = [
  <>Everything here,<br />I built and shipped.</>,
  <>Growth turned out<br />to be a timing problem.</>,
  <>AI does the typing.<br />The taste is mine.</>,
  <>I sand the edges<br />no one will see.</>,
  <>The demo is<br />the real product.</>,
  <>Software should feel<br />like someone cared.</>,
  <>The best products disappear.<br />That's the point.</>,
  <>I build things<br />worth remembering.</>
];

function RotatingSubtitle({ isVisible }: { isVisible: boolean }) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isPaused || !isVisible) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROTATING_MESSAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, isVisible]);

  const transitionEase = [0.22, 1, 0.36, 1];

  const variants = {
    enter: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 10,
      filter: prefersReducedMotion ? 'blur(0px)' : 'blur(3px)',
    },
    center: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        delay: 0.08,
        ease: transitionEase,
      }
    },
    exit: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : -10,
      filter: prefersReducedMotion ? 'blur(0px)' : 'blur(3px)',
      transition: {
        duration: 0.5,
        ease: transitionEase,
      }
    }
  };

  return (
    <div 
      className="mt-2 md:mt-20 flex flex-col items-center md:items-start md:mx-0 mx-auto w-[85vw] max-w-[340px] md:max-w-[420px] relative pointer-events-auto cursor-default"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="h-[64px] md:h-[120px] w-full relative flex justify-center md:justify-start">
        <AnimatePresence mode="popLayout">
          {isVisible && (
            <motion.p
              key={index}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute top-0 w-full text-[21px] md:text-4xl lg:text-[36px] text-[#F5F5F7] font-medium leading-[1.25] tracking-tight text-center md:text-left md:left-0 drop-shadow-sm"
              style={{ letterSpacing: '-0.02em' }}
            >
              {ROTATING_MESSAGES[index]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Pagination Dots (Mobile Only) */}
      <div className="flex items-center gap-[6px] mt-4 md:hidden opacity-100 transition-opacity duration-1000" style={{ opacity: isVisible ? 1 : 0 }}>
        {[0, 1, 2].map((i) => (
          <div 
            key={i} 
            className={`w-[5px] h-[5px] rounded-full transition-colors duration-500 ${
              (index % 3) === i ? 'bg-white' : 'bg-white/30'
            }`} 
          />
        ))}
      </div>
    </div>
  );
}

export default function HeroContent() {
  const phase = useStartupPhase();

  return (
    <div className="absolute inset-0 z-10 flex items-center pointer-events-none">
      {/* Desktop Layout — untouched */}
      <div 
        className={`hidden md:block w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-20 transition-all duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${phase >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <div className="max-w-3xl lg:-translate-x-8 xl:-translate-x-12">
          <h1 className="text-5xl md:text-6xl lg:text-[4.6rem] font-bold tracking-tight text-white leading-[1.05] mb-10" style={{ letterSpacing: '-0.035em' }}>
            Vipul<br />
            Katarnaware.
          </h1>
          <p className="text-[22px] md:text-[28px] text-white/60 font-[450] tracking-tight mb-4" style={{ letterSpacing: '-0.015em' }}>
            Product Manager · AI Builder · Founder
          </p>
          <RotatingSubtitle isVisible={phase >= 6} />
        </div>
      </div>

      {/* Mobile Layout — absolute positioned for precise vertical rhythm */}
      <div className="md:hidden w-full h-full pointer-events-none relative">
        
        {/* Top: Name -> Role */}
        <div 
          className={`absolute top-0 w-full pt-[max(env(safe-area-inset-top),64px)] mt-4 px-6 flex flex-col items-center gap-4 transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] ${phase >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}
        >
          <h1 
            className="text-[42px] leading-[1.05] font-bold tracking-tight text-white text-center drop-shadow-md"
            style={{ letterSpacing: '-0.03em' }}
          >
            Vipul<br />Katarnaware.
          </h1>
          <p 
            className="text-[16px] text-white/80 font-medium tracking-tight text-center drop-shadow-md transition-all duration-600 delay-150 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ letterSpacing: '-0.01em', opacity: phase >= 5 ? 1 : 0 }}
          >
            Product Manager · AI Builder · Founder
          </p>
        </div>

        {/* Bottom: Philosophy */}
        <div 
          className={`absolute bottom-0 w-full px-6 flex flex-col items-center transition-all duration-600 delay-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${phase >= 6 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ paddingBottom: 'calc(158px + env(safe-area-inset-bottom, 16px))' }}
        >
          <RotatingSubtitle isVisible={phase >= 6} />
        </div>

      </div>
    </div>
  );
}
