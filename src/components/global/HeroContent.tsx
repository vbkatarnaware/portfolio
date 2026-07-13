import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

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

function RotatingSubtitle() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROTATING_MESSAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused]);

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
      className="mt-20 h-[100px] md:h-[120px] max-w-[420px] relative pointer-events-auto cursor-default"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <AnimatePresence mode="popLayout">
        <motion.p
          key={index}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute top-0 left-0 text-3xl md:text-4xl lg:text-[36px] text-[#F5F5F7] font-medium leading-[1.1] tracking-tight"
          style={{ letterSpacing: '-0.025em', whiteSpace: 'nowrap' }}
        >
          {ROTATING_MESSAGES[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export default function HeroContent() {
  return (
    <div className="absolute inset-0 z-10 flex items-center pointer-events-none">
      <div className="w-full max-w-7xl mx-auto px-12 md:px-24">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl lg:text-[4.6rem] font-bold tracking-tight text-white leading-[1.05] mb-10" style={{ letterSpacing: '-0.02em' }}>
            Vipul<br />
            Katarnaware.
          </h1>
          <p className="text-[22px] md:text-[28px] text-white/60 font-[450] tracking-tight mb-4">
            Product Manager · Builder · Founder
          </p>
          <RotatingSubtitle />
        </div>
      </div>
    </div>
  );
}
