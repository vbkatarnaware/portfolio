import { useState, useEffect } from 'react';
import { BsGithub } from 'react-icons/bs';
import { IoIosMail } from 'react-icons/io';
import { motion, useAnimation } from 'framer-motion';

interface DesktopDockProps {
  onOpenQRapid?: () => void;
  onOpenFinder?: () => void;
}

export default function DesktopDock({ onOpenQRapid, onOpenFinder }: DesktopDockProps) {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const qRapidControls = useAnimation();
  const [showDot, setShowDot] = useState(false);

  useEffect(() => {
    const bouncedBefore = sessionStorage.getItem('qrapid_bounced_v2');
    if (!bouncedBefore) {
      const runBounce = async () => {
        // Wait a bit for the site to load
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        await qRapidControls.start({
          y: [0, -45, 0, -22, 0, -8, 0],
          transition: { 
            duration: 1.6, 
            times: [0, 0.25, 0.5, 0.75, 0.88, 0.95, 1],
            ease: ["easeOut", "easeIn", "easeOut", "easeIn", "easeOut", "easeIn"]
          }
        });
        
        sessionStorage.setItem('qrapid_bounced_v2', 'true');
        setShowDot(true);
      };
      runBounce();
    } else {
      setShowDot(true);
    }
  }, [qRapidControls]);

  const handleEmailClick = () => {
    window.location.href = 'mailto:john@johndoe.com';
  };

  const handleGithubClick = () => {
    window.open('https://github.com/vbkatarnaware', '_blank');
  };

  const handleCalendarClick = () => {
    window.open('https://calendly.com/', '_blank');
  };

  const handleLinkedinClick = () => {
    window.open('https://linkedin.com/', '_blank');
  };

  const Tooltip = ({ text }: { text: string }) => (
    <div className='absolute -top-14 left-1/2 -translate-x-1/2'>
      <div className='relative px-3 py-1 bg-[#1d1d1f]/80 backdrop-blur-sm text-white text-sm rounded-lg whitespace-nowrap border border-px border-gray-600'>
        {text}
        <div className='absolute left-1/2 -translate-x-1/2 -bottom-[7px] w-3 h-3 bg-[#1d1d1f]/80 backdrop-blur-sm rotate-45 border-b border-r border-gray-600' />
      </div>
    </div>
  );

  const dockItemVariants = {
    initial: { scale: 1, y: 0 },
    hover: { scale: 1.2, y: -10, transition: { type: 'spring', stiffness: 400, damping: 20 } },
    tap: { scale: 0.95 }
  };

  return (
    <div className='fixed bottom-0 left-1/2 -translate-x-1/2 hidden md:block z-50'>
      <div className='relative mb-2 p-3 bg-[#1c1c1e]/60 border border-white/10 backdrop-blur-2xl rounded-2xl'>
        <div className='flex items-end space-x-4'>
          {/* Finder */}
          <motion.div
            variants={dockItemVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={onOpenFinder}
            onMouseEnter={() => setHoveredIcon('finder')}
            onMouseLeave={() => setHoveredIcon(null)}
            className='relative cursor-pointer'
          >
            <div className='w-14 h-14 rounded-xl flex items-center justify-center shadow-lg overflow-hidden'>
              <img src='/finder.png' alt='Finder' className='w-full h-full object-cover' />
            </div>
            {hoveredIcon === 'finder' && <Tooltip text='Finder' />}
          </motion.div>

          {/* QRapid */}
          <motion.div
            variants={dockItemVariants}
            initial="initial"
            animate={qRapidControls}
            whileHover="hover"
            whileTap="tap"
            onClick={onOpenQRapid}
            onMouseEnter={() => setHoveredIcon('custom')}
            onMouseLeave={() => setHoveredIcon(null)}
            className='relative cursor-pointer flex flex-col items-center'
          >
            <div className='w-14 h-14 rounded-xl flex items-center justify-center shadow-lg overflow-hidden'>
              <img src='/custom-icon.png' alt='QRapid' className='w-full h-full object-cover' />
            </div>
            {/* White dot indicator */}
            {showDot && (
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 20 }}
                className="absolute -bottom-2 w-1 h-1 rounded-full bg-white/80" 
              />
            )}
            {hoveredIcon === 'custom' && <Tooltip text='QRapid' />}
          </motion.div>

          {/* CareerOS */}
          <motion.div
            variants={dockItemVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onMouseEnter={() => setHoveredIcon('careeros')}
            onMouseLeave={() => setHoveredIcon(null)}
            className='relative cursor-pointer'
          >
            <div className='w-14 h-14 rounded-xl flex items-center justify-center shadow-lg overflow-hidden'>
              <img src='/careeros.png' alt='CareerOS' className='w-full h-full object-cover' />
            </div>
            {hoveredIcon === 'careeros' && <Tooltip text='CareerOS' />}
          </motion.div>

          {/* Rizent AI */}
          <motion.div
            variants={dockItemVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onMouseEnter={() => setHoveredIcon('rizent')}
            onMouseLeave={() => setHoveredIcon(null)}
            className='relative cursor-pointer'
          >
            <div className='w-14 h-14 rounded-xl flex items-center justify-center shadow-lg overflow-hidden'>
              <img src='/rizent.svg' alt='Rizent AI' className='w-full h-full object-cover' />
            </div>
            {hoveredIcon === 'rizent' && <Tooltip text='Rizent AI' />}
          </motion.div>

          {/* MoatDaily */}
          <motion.div
            variants={dockItemVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onMouseEnter={() => setHoveredIcon('moatdaily')}
            onMouseLeave={() => setHoveredIcon(null)}
            className='relative cursor-pointer'
          >
            <div className='w-14 h-14 rounded-xl flex items-center justify-center shadow-lg overflow-hidden border border-white/50'>
              <img src='/moatdaily.png' alt='MoatDaily' className='w-full h-full object-cover' />
            </div>
            {hoveredIcon === 'moatdaily' && <Tooltip text='MoatDaily' />}
          </motion.div>

          {/* Divider */}
          <div className='flex items-center h-14'>
            <div className='w-px h-10 bg-white/20' />
          </div>

          {/* LinkedIn */}
          <motion.button
            variants={dockItemVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={handleLinkedinClick}
            onMouseEnter={() => setHoveredIcon('linkedin')}
            onMouseLeave={() => setHoveredIcon(null)}
            className='relative cursor-pointer'
          >
            <div className='w-14 h-14 rounded-xl flex items-center justify-center shadow-lg overflow-hidden'>
              <img src='/linkedin.png' alt='LinkedIn' className='w-full h-full object-cover' />
            </div>
            {hoveredIcon === 'linkedin' && <Tooltip text='LinkedIn' />}
          </motion.button>

          {/* Github */}
          <motion.button
            variants={dockItemVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={handleGithubClick}
            onMouseEnter={() => setHoveredIcon('github')}
            onMouseLeave={() => setHoveredIcon(null)}
            className='relative cursor-pointer'
          >
            <div className='w-14 h-14 bg-gradient-to-t from-[#2b2b2b] to-[#1c1c1e] border border-white/10 rounded-xl flex items-center justify-center shadow-lg'>
              <BsGithub size={40} className='text-gray-100' />
            </div>
            {hoveredIcon === 'github' && <Tooltip text='My GitHub' />}
          </motion.button>

          {/* Email */}
          <motion.button
            variants={dockItemVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={handleEmailClick}
            onMouseEnter={() => setHoveredIcon('email')}
            onMouseLeave={() => setHoveredIcon(null)}
            className='relative cursor-pointer'
          >
            <div className='w-14 h-14 bg-gradient-to-t from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-lg'>
              <IoIosMail size={45} className='text-white' />
            </div>
            {hoveredIcon === 'email' && <Tooltip text='Email Me' />}
          </motion.button>

          {/* Calendar */}
          <motion.button
            variants={dockItemVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={handleCalendarClick}
            onMouseEnter={() => setHoveredIcon('calendar')}
            onMouseLeave={() => setHoveredIcon(null)}
            className='relative cursor-pointer'
          >
            <div className='w-14 h-14 overflow-hidden shadow-lg relative border border-white/10 rounded-xl'>
              <div className='absolute inset-0 bg-gradient-to-b from-white to-gray-200'></div>
              <div className='absolute top-0 inset-x-0 h-4 bg-[#ff3b30] flex items-center justify-center'>
                <span className='text-[10px] font-bold text-white uppercase tracking-wider'>
                  {new Date().toLocaleString('en-US', { month: 'short' })}
                </span>
              </div>
              <div className='absolute inset-0 flex items-end justify-center pb-1'>
                <span className='text-3xl font-light text-black tracking-tighter'>
                  {new Date().getDate()}
                </span>
              </div>
            </div>
            {hoveredIcon === 'calendar' && <Tooltip text='Book a Call' />}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
