import { IoIosMail } from 'react-icons/io';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useStartupPhase } from '../../context/StartupContext';

interface MobileDockProps {
  onOpenQRapid?: () => void;
  onOpenFinder?: () => void;
}

export default function MobileDock({ onOpenQRapid }: MobileDockProps) {
  const phase = useStartupPhase();
  const qRapidControls = useAnimation();
  const [showDot, setShowDot] = useState(false);

  useEffect(() => {
    // We retain the bounce logic so mobile gets the flagship experience too
    const bouncedBefore = sessionStorage.getItem('qrapid_bounced_mobile');
    if (phase >= 4 && !bouncedBefore) {
      const runBounce = async () => {
        await new Promise(resolve => setTimeout(resolve, 800)); // slightly faster on mobile
        
        await qRapidControls.start({
          y: [0, -35, 0, -15, 0, -5, 0],
          transition: { 
            duration: 1.4, 
            times: [0, 0.25, 0.5, 0.75, 0.88, 0.95, 1],
            ease: ["easeOut", "easeIn", "easeOut", "easeIn", "easeOut", "easeIn"]
          }
        });
        
        sessionStorage.setItem('qrapid_bounced_mobile', 'true');
        setShowDot(true);
      };
      runBounce();
    } else if (phase >= 4) {
      setShowDot(true);
    }
  }, [phase, qRapidControls]);

  const handleEmailClick = () => {
    window.location.href = 'mailto:john@johndoe.com';
  };

  const dockItemVariants = {
    tap: { scale: 0.9 }
  };

  return (
    <motion.div 
      className='fixed left-0 right-0 md:hidden z-50 pointer-events-none flex justify-center'
      initial={{ bottom: -150, opacity: 0 }}
      animate={phase >= 3 ? { bottom: 0, opacity: 1 } : { bottom: -150, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className='mb-[32px] py-3 px-5 bg-[#1c1c1e]/60 border border-white/10 backdrop-blur-2xl rounded-[30px] flex justify-between items-center w-[92%] max-w-[340px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto'>
        
        {/* QRapid (Flagship) */}
        <motion.div variants={dockItemVariants} whileTap="tap" onClick={onOpenQRapid} animate={qRapidControls} className='flex flex-col items-center cursor-pointer relative'>
          <div className='w-14 h-14 rounded-[14px] flex items-center justify-center shadow-lg overflow-hidden'>
            <img src='/custom-icon.png' alt='QRapid' className='w-full h-full object-cover' />
          </div>
          {showDot && (
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 20 }}
              className="absolute -bottom-1.5 w-[5px] h-[5px] rounded-full bg-white/80" 
            />
          )}
        </motion.div>

        {/* CareerOS */}
        <motion.div variants={dockItemVariants} whileTap="tap" className='flex flex-col items-center cursor-pointer'>
          <div className='w-14 h-14 rounded-[14px] flex items-center justify-center shadow-lg overflow-hidden'>
            <img src='/careeros.png' alt='CareerOS' className='w-full h-full object-cover' />
          </div>
        </motion.div>

        {/* MoatDaily */}
        <motion.div variants={dockItemVariants} whileTap="tap" className='flex flex-col items-center cursor-pointer'>
          <div className='w-14 h-14 rounded-[14px] flex items-center justify-center shadow-lg overflow-hidden border border-white/15'>
            <img src='/moatdaily.png' alt='MoatDaily' className='w-full h-full object-cover' />
          </div>
        </motion.div>

        {/* Contact (Email) */}
        <motion.button variants={dockItemVariants} whileTap="tap" onClick={handleEmailClick} className='flex flex-col items-center cursor-pointer'>
          <div className='w-14 h-14 bg-gradient-to-t from-blue-600 to-blue-400 rounded-[14px] flex items-center justify-center shadow-lg'>
            <IoIosMail size={38} className='text-white' />
          </div>
        </motion.button>

      </div>
    </motion.div>
  );
}
