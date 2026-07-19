import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useStartupPhase } from '../../context/StartupContext';
import customIconImg from '../../assets/images/custom-icon.png';
import iciciImg from '../../assets/images/icici.png';
import mailImg from '../../assets/images/mail.svg';
import careerosImg from '../../assets/images/careeros.png';
import rizentImg from '../../assets/images/rizent.svg';
import moatdailyImg from '../../assets/images/moatdaily.png';
import type { AppId } from '../../context/WindowContext';
import { useWindows } from '../../context/WindowContext';

interface MobileDockProps {
  onOpenWindow: (id: AppId) => void;
}

// Mobile dock: same app set and grouping as DesktopDock, re-flowed into a
// horizontally scrollable strip rather than dropping any icon (Mobile
// principle — same IA, touch-optimized).
export default function MobileDock({ onOpenWindow }: MobileDockProps) {
  const phase = useStartupPhase();
  const { windows } = useWindows();
  const qRapidControls = useAnimation();
  // QRapid carries a permanent "start here" onboarding cue dot, visible
  // immediately (mirrors DesktopDock) — independent of the bounce below.
  const [qrapidCueDot] = useState(true);

  useEffect(() => {
    const bouncedBefore = sessionStorage.getItem('qrapid_bounced_mobile');
    if (phase >= 4 && !bouncedBefore) {
      const runBounce = async () => {
        await new Promise(resolve => setTimeout(resolve, 800));
        await qRapidControls.start({
          y: [0, -35, 0, -15, 0, -5, 0],
          transition: {
            duration: 1.4,
            times: [0, 0.25, 0.5, 0.75, 0.88, 0.95, 1],
            ease: ["easeOut", "easeIn", "easeOut", "easeIn", "easeOut", "easeIn"]
          }
        });
        sessionStorage.setItem('qrapid_bounced_mobile', 'true');
      };
      runBounce();
    }
  }, [phase, qRapidControls]);

  const handleEmailClick = () => {
    window.location.href = 'mailto:vipulkatarnaware@gmail.com';
  };

  const dockItemVariants = {
    tap: { scale: 0.9 }
  };

  const items: { id: AppId; label: string; img: string; controls?: typeof qRapidControls }[] = [
    { id: 'qrapid', label: 'QRapid', img: customIconImg.src, controls: qRapidControls },
    { id: 'icici', label: 'ICICI', img: iciciImg.src },
    { id: 'careeros', label: 'CareerOS', img: careerosImg.src },
    { id: 'rizent', label: 'Rizent', img: rizentImg.src },
    { id: 'moatdaily', label: 'MoatDaily', img: moatdailyImg.src },
  ];

  return (
    <motion.div
      className='fixed bottom-0 left-0 right-0 min-[1025px]:hidden z-50 pointer-events-none flex justify-center'
      initial={{ y: 150, opacity: 0 }}
      animate={phase >= 3 ? { y: 0, opacity: 1 } : { y: 150, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 16px)' }}
    >
      <div className='mb-[16px] py-[12px] px-[16px] bg-[#1a1a1c]/80 border border-white/10 backdrop-blur-3xl rounded-[34px] flex items-start gap-4 w-[92%] max-w-[400px] overflow-x-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto [&::-webkit-scrollbar]:hidden'>

        {items.map((item) => (
          <motion.div
            key={item.id}
            variants={dockItemVariants}
            whileTap="tap"
            onClick={() => onOpenWindow(item.id)}
            animate={item.controls}
            className='flex flex-col items-center cursor-pointer gap-[5px] relative shrink-0'
          >
            <div className='relative w-[54px] h-[54px] rounded-[14px] flex items-center justify-center shadow-lg overflow-hidden bg-white'>
              <img src={item.img} alt={item.label} className='w-full h-full object-cover' />
            </div>
            <div className="flex flex-col items-center gap-[2px]">
              {(windows[item.id]?.isOpen || (item.id === 'qrapid' && qrapidCueDot)) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', damping: 20 }}
                  className="w-1 h-1 rounded-full bg-white/80"
                />
              )}
              <span className="text-[11px] font-medium text-white/90 tracking-wide whitespace-nowrap">{item.label}</span>
            </div>
          </motion.div>
        ))}

        {/* Contact */}
        <motion.button
          variants={dockItemVariants}
          whileTap="tap"
          onClick={handleEmailClick}
          className='flex flex-col items-center cursor-pointer gap-[5px] shrink-0'
        >
          <div className='w-[54px] h-[54px] rounded-[14px] flex items-center justify-center shadow-lg overflow-hidden'>
            <img src={mailImg.src} alt='Contact' className='w-full h-full object-cover' />
          </div>
          <span className="text-[11px] font-medium text-white/90 tracking-wide">Contact</span>
        </motion.button>

      </div>
    </motion.div>
  );
}
