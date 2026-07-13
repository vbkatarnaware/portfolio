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
      className="mt-4 md:mt-20 h-[80px] md:h-[120px] max-w-[420px] relative pointer-events-auto cursor-default flex justify-center md:justify-start"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <AnimatePresence mode="popLayout">
        {isVisible && (
          <motion.p
            key={index}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute top-0 text-3xl md:text-4xl lg:text-[36px] text-[#F5F5F7] font-medium leading-[1.1] tracking-tight md:left-0 text-center md:text-left"
            style={{ letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}
          >
            {ROTATING_MESSAGES[index]}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HeroContent() {
  const phase = useStartupPhase();

  return (
    <div className="absolute inset-0 z-10 flex items-center pointer-events-none">
      {/* Desktop Layout */}
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

      {/* Mobile Layout */}
      <div 
        className={`md:hidden flex flex-col justify-between w-full h-[100dvh] pt-24 pb-32 px-8 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${phase >= 5 ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Top: Name */}
        <div className={`transition-all duration-700 delay-100 ${phase >= 5 ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
          <h1 className="text-[2.8rem] leading-[1.05] font-bold tracking-tight text-white text-center" style={{ letterSpacing: '-0.03em' }}>
            Vipul<br />Katarnaware.
          </h1>
        </div>

        {/* Bottom: Role & Philosophy */}
        <div className={`flex flex-col items-center transition-all duration-700 delay-300 ${phase >= 6 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <p className="text-[19px] text-white/70 font-medium tracking-tight mb-2 text-center" style={{ letterSpacing: '-0.015em' }}>
            Product Manager · AI Builder · Founder
          </p>
          <div className="flex justify-center w-full">
            <RotatingSubtitle isVisible={phase >= 6} />
          </div>
        </div>
      </div>
    </div>
  );
}
