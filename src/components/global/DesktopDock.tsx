import { useState, useEffect } from 'react';
import { BsGithub } from 'react-icons/bs';
import { motion, useAnimation } from 'framer-motion';
import finderImg from '../../assets/images/finder.png';
import customIconImg from '../../assets/images/custom-icon.png';
import iciciImg from '../../assets/images/icici.png';
import mailImg from '../../assets/images/mail.svg';
import careerosImg from '../../assets/images/careeros.png';
import rizentImg from '../../assets/images/rizent.svg';
import moatdailyImg from '../../assets/images/moatdaily.png';
import linkedinImg from '../../assets/images/linkedin.png';
import type { AppId } from '../../context/WindowContext';
import { useWindows } from '../../context/WindowContext';

interface DesktopDockProps {
  onOpenWindow: (id: AppId) => void;
}

// Dock order (locked): Finder | QRapid ICICI (Experience) | CareerOS Rizent
// MoatDaily (Independent Products) | LinkedIn GitHub Email Calendar.
// Grouping is communicated by spacing only — no extra navigation hierarchy.
export default function DesktopDock({ onOpenWindow }: DesktopDockProps) {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const { windows } = useWindows();
  const qRapidControls = useAnimation();
  // QRapid carries a dot by default as the "start here" onboarding cue —
  // it appears after the attention bounce lands (instantly on revisits).
  const [qrapidCueDot, setQrapidCueDot] = useState(false);

  useEffect(() => {
    const bouncedBefore = sessionStorage.getItem('qrapid_bounced_v2');
    if (!bouncedBefore) {
      const runBounce = async () => {
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
        setQrapidCueDot(true);
      };
      runBounce();
    } else {
      setQrapidCueDot(true);
    }
  }, [qRapidControls]);

  // macOS running-app indicator: a dot appears under every OPEN app window.
  // QRapid additionally shows it by default (onboarding cue, see above).
  // Social/link icons never get one — they're links, not apps.
  const OpenDot = ({ id }: { id: AppId }) =>
    windows[id]?.isOpen || (id === 'qrapid' && qrapidCueDot) ? (
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 20 }}
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/80"
      />
    ) : null;

  const handleEmailClick = () => {
    window.location.href = 'mailto:vipulkatarnaware@gmail.com';
  };

  const handleGithubClick = () => {
    window.open('https://github.com/vbkatarnaware', '_blank');
  };

  const handleCalendarClick = () => {
    // No standing scheduling link yet — route to Contact instead of a dead
    // generic calendly.com URL.
    onOpenWindow('finder');
    window.history.pushState(null, '', '/contact');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleLinkedinClick = () => {
    window.open('https://linkedin.com/in/vipul-katarnaware', '_blank');
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

  const Divider = () => (
    <div className='flex items-center h-14'>
      <div className='w-px h-10 bg-white/20' />
    </div>
  );

  return (
    <motion.div
      className='fixed bottom-10 left-0 right-0 hidden min-[1025px]:flex justify-center z-50 pointer-events-none'>
      <div className='relative mb-2 p-3 bg-[#1c1c1e]/60 border border-white/10 backdrop-blur-2xl rounded-2xl pointer-events-auto'>
        <div className='flex items-end space-x-4'>
          {/* Finder */}
          <motion.div
            variants={dockItemVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={() => onOpenWindow('finder')}
            onMouseEnter={() => setHoveredIcon('finder')}
            onMouseLeave={() => setHoveredIcon(null)}
            className='relative cursor-pointer'
          >
            <div className='w-14 h-14 rounded-xl flex items-center justify-center shadow-lg overflow-hidden'>
              <img src={finderImg.src} alt='Finder' className='w-full h-full object-cover' />
            </div>
            <OpenDot id='finder' />
            {hoveredIcon === 'finder' && <Tooltip text='Finder' />}
          </motion.div>

          {/* QRapid */}
          <motion.div
            variants={dockItemVariants}
            initial="initial"
            animate={qRapidControls}
            whileHover="hover"
            whileTap="tap"
            onClick={() => onOpenWindow('qrapid')}
            onMouseEnter={() => setHoveredIcon('qrapid')}
            onMouseLeave={() => setHoveredIcon(null)}
            className='relative cursor-pointer flex flex-col items-center'
          >
            <div className='w-14 h-14 rounded-xl flex items-center justify-center shadow-lg overflow-hidden'>
              <img src={customIconImg.src} alt='QRapid' className='w-full h-full object-cover' />
            </div>
            <OpenDot id='qrapid' />
            {hoveredIcon === 'qrapid' && <Tooltip text='QRapid' />}
          </motion.div>

          {/* ICICI */}
          <motion.div
            variants={dockItemVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={() => onOpenWindow('icici')}
            onMouseEnter={() => setHoveredIcon('icici')}
            onMouseLeave={() => setHoveredIcon(null)}
            className='relative cursor-pointer'
          >
            <div className='w-14 h-14 rounded-xl flex items-center justify-center shadow-lg overflow-hidden'>
              <img src={iciciImg.src} alt='ICICI Bank' className='w-full h-full object-cover' />
            </div>
            <OpenDot id='icici' />
            {hoveredIcon === 'icici' && <Tooltip text='ICICI Bank' />}
          </motion.div>

          <Divider />

          {/* CareerOS */}
          <motion.div
            variants={dockItemVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={() => onOpenWindow('careeros')}
            onMouseEnter={() => setHoveredIcon('careeros')}
            onMouseLeave={() => setHoveredIcon(null)}
            className='relative cursor-pointer'
          >
            <div className='w-14 h-14 rounded-xl flex items-center justify-center shadow-lg overflow-hidden'>
              <img src={careerosImg.src} alt='CareerOS' className='w-full h-full object-cover' />
            </div>
            <OpenDot id='careeros' />
            {hoveredIcon === 'careeros' && <Tooltip text='CareerOS' />}
          </motion.div>

          {/* Rizent AI */}
          <motion.div
            variants={dockItemVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={() => onOpenWindow('rizent')}
            onMouseEnter={() => setHoveredIcon('rizent')}
            onMouseLeave={() => setHoveredIcon(null)}
            className='relative cursor-pointer'
          >
            <div className='w-14 h-14 rounded-xl flex items-center justify-center shadow-lg overflow-hidden'>
              <img src={rizentImg.src} alt='Rizent AI' className='w-full h-full object-cover' />
            </div>
            <OpenDot id='rizent' />
            {hoveredIcon === 'rizent' && <Tooltip text='Rizent AI' />}
          </motion.div>

          {/* MoatDaily */}
          <motion.div
            variants={dockItemVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={() => onOpenWindow('moatdaily')}
            onMouseEnter={() => setHoveredIcon('moatdaily')}
            onMouseLeave={() => setHoveredIcon(null)}
            className='relative cursor-pointer'
          >
            <div className='w-14 h-14 rounded-xl flex items-center justify-center shadow-lg overflow-hidden border border-white/50'>
              <img src={moatdailyImg.src} alt='MoatDaily' className='w-full h-full object-cover' />
            </div>
            <OpenDot id='moatdaily' />
            {hoveredIcon === 'moatdaily' && <Tooltip text='MoatDaily' />}
          </motion.div>

          <Divider />

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
              <img src={linkedinImg.src} alt='LinkedIn' className='w-full h-full object-cover' />
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
            <div className='w-14 h-14 rounded-xl flex items-center justify-center shadow-lg overflow-hidden'>
              <img src={mailImg.src} alt='Email' className='w-full h-full object-cover' />
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
            {hoveredIcon === 'calendar' && <Tooltip text='Book a call' />}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
