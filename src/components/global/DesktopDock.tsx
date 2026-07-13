import { useState, useRef, useEffect } from 'react';
import { BsGithub } from 'react-icons/bs';
import { IoIosMail } from 'react-icons/io';
import { motion, useMotionValue, useTransform, useSpring, useAnimation } from 'framer-motion';
import { useStartupPhase } from '../../context/StartupContext';

interface DockIconProps {
  tooltip: string;
  onClick?: () => void;
  mouseX: any;
  children: React.ReactNode;
  isRunning?: boolean;
  isBouncing?: boolean;
}

function DockIcon({ tooltip, onClick, mouseX, children, isRunning, isBouncing }: DockIconProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [56, 85, 56]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const yControls = useAnimation();

  useEffect(() => {
    if (isBouncing) {
      yControls.start({
        y: [0, -40, 0, -20, 0, -5, 0],
        transition: { duration: 1.2, ease: "easeOut" }
      });
    }
  }, [isBouncing, yControls]);

  return (
    <div className="relative flex flex-col items-center">
      <motion.button
        ref={ref}
        style={{ width, height: width }}
        className="relative cursor-pointer flex items-center justify-center rounded-xl overflow-hidden shadow-lg border border-white/10"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onClick}
        whileTap={{ scale: 0.9 }}
        animate={yControls}
      >
        {children}
      </motion.button>
      
      {isRunning && (
        <div className="absolute -bottom-2 w-1 h-1 rounded-full bg-white/80" />
      )}

      {hovered && (
        <div className='absolute -top-14 left-1/2 -translate-x-1/2 pointer-events-none z-50'>
          <div className='relative px-3 py-1 bg-[#1d1d1f]/80 backdrop-blur-sm text-white text-sm rounded-lg whitespace-nowrap border border-px border-gray-600 shadow-xl'>
            {tooltip}
            <div className='absolute left-1/2 -translate-x-1/2 -bottom-[5px] w-2.5 h-2.5 bg-[#1d1d1f]/80 backdrop-blur-sm rotate-45 border-b border-r border-gray-600' />
          </div>
        </div>
      )}
    </div>
  );
}

interface DesktopDockProps {
  onOpenQRapid?: () => void;
  onOpenFinder?: () => void;
}

export default function DesktopDock({ onOpenQRapid, onOpenFinder }: DesktopDockProps) {
  const mouseX = useMotionValue(Infinity);
  const phase = useStartupPhase();
  const [hasBounced, setHasBounced] = useState(false);

  useEffect(() => {
    if (phase >= 4 && !hasBounced) {
      const bouncedBefore = sessionStorage.getItem('qrapid_bounced');
      if (!bouncedBefore) {
        setHasBounced(true);
        sessionStorage.setItem('qrapid_bounced', 'true');
      }
    }
  }, [phase, hasBounced]);

  const handleEmailClick = () => window.location.href = 'mailto:john@johndoe.com';
  const handleGithubClick = () => window.open('https://github.com/vbkatarnaware', '_blank');
  const handleCalendarClick = () => window.open('https://calendly.com/', '_blank');
  const handleLinkedinClick = () => window.open('https://linkedin.com/', '_blank');

  return (
    <motion.div 
      className='fixed bottom-2 left-1/2 -translate-x-1/2 hidden md:block z-50'
      initial={{ y: 150, opacity: 0 }}
      animate={phase >= 3 ? { y: 0, opacity: 1 } : { y: 150, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <div 
        className='relative p-3 bg-[#1c1c1e]/40 border border-white/10 backdrop-blur-2xl rounded-2xl flex items-end space-x-3 shadow-2xl'
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        <DockIcon mouseX={mouseX} tooltip="Finder" onClick={onOpenFinder}>
          <img src='/finder.png' alt='Finder' className='w-full h-full object-cover' />
        </DockIcon>

        <DockIcon mouseX={mouseX} tooltip="QRapid" onClick={onOpenQRapid} isBouncing={hasBounced} isRunning={true}>
          <img src='/custom-icon.png' alt='QRapid' className='w-full h-full object-cover' />
        </DockIcon>

        <DockIcon mouseX={mouseX} tooltip="CareerOS">
          <img src='/careeros.png' alt='CareerOS' className='w-full h-full object-cover' />
        </DockIcon>

        <DockIcon mouseX={mouseX} tooltip="Rizent AI">
          <img src='/rizent.svg' alt='Rizent AI' className='w-full h-full object-cover' />
        </DockIcon>

        <DockIcon mouseX={mouseX} tooltip="MoatDaily">
          <img src='/moatdaily.png' alt='MoatDaily' className='w-full h-full object-cover bg-black' />
        </DockIcon>

        <div className='flex items-center h-14 mx-1'>
          <div className='w-[1px] h-10 bg-white/20' />
        </div>

        <DockIcon mouseX={mouseX} tooltip="LinkedIn" onClick={handleLinkedinClick}>
          <img src='/linkedin.png' alt='LinkedIn' className='w-full h-full object-cover' />
        </DockIcon>

        <DockIcon mouseX={mouseX} tooltip="My GitHub" onClick={handleGithubClick}>
          <div className='w-full h-full bg-gradient-to-t from-[#2b2b2b] to-[#1c1c1e] flex items-center justify-center'>
            <BsGithub size="60%" className='text-gray-100' />
          </div>
        </DockIcon>

        <DockIcon mouseX={mouseX} tooltip="Email Me" onClick={handleEmailClick}>
          <div className='w-full h-full bg-gradient-to-t from-blue-600 to-blue-400 flex items-center justify-center'>
            <IoIosMail size="70%" className='text-white' />
          </div>
        </DockIcon>

        <DockIcon mouseX={mouseX} tooltip="Book a Call" onClick={handleCalendarClick}>
          <div className='w-full h-full overflow-hidden shadow-inner bg-gradient-to-b from-white to-gray-200 relative'>
            <div className='absolute top-0 inset-x-0 h-1/3 bg-[#ff3b30] flex items-center justify-center'>
              <span className='text-[30%] font-bold text-white uppercase tracking-wider'>
                {new Date().toLocaleString('en-US', { month: 'short' })}
              </span>
            </div>
            <div className='absolute bottom-0 inset-x-0 h-2/3 flex items-center justify-center'>
              <span className='text-[80%] font-light text-black tracking-tighter leading-none mt-1'>
                {new Date().getDate()}
              </span>
            </div>
          </div>
        </DockIcon>
      </div>
    </motion.div>
  );
}
