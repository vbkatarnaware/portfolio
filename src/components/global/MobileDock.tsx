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
      className='fixed bottom-0 left-0 right-0 md:hidden z-50'
      initial={{ y: 150, opacity: 0 }}
      animate={phase >= 3 ? { y: 0, opacity: 1 } : { y: 150, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <div className='mx-auto mb-6 p-2.5 bg-[#1c1c1e]/60 border border-white/10 backdrop-blur-2xl rounded-3xl flex justify-around items-center w-[90%] max-w-[320px] shadow-2xl'>
        
        {/* QRapid (Flagship) */}
        <motion.div variants={dockItemVariants} whileTap="tap" onClick={onOpenQRapid} animate={qRapidControls} className='flex flex-col items-center cursor-pointer relative'>
          <div className='w-[3.2rem] h-[3.2rem] rounded-xl flex items-center justify-center shadow-lg overflow-hidden'>
            <img src='/custom-icon.png' alt='QRapid' className='w-full h-full object-cover' />
          </div>
          {showDot && (
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 20 }}
              className="absolute -bottom-2 w-[5px] h-[5px] rounded-full bg-white/80" 
            />
          )}
        </motion.div>

        {/* CareerOS */}
        <motion.div variants={dockItemVariants} whileTap="tap" className='flex flex-col items-center cursor-pointer'>
          <div className='w-[3.2rem] h-[3.2rem] rounded-xl flex items-center justify-center shadow-lg overflow-hidden'>
            <img src='/careeros.png' alt='CareerOS' className='w-full h-full object-cover' />
          </div>
        </motion.div>

        {/* MoatDaily */}
        <motion.div variants={dockItemVariants} whileTap="tap" className='flex flex-col items-center cursor-pointer'>
          <div className='w-[3.2rem] h-[3.2rem] rounded-xl flex items-center justify-center shadow-lg overflow-hidden border border-white/20'>
            <img src='/moatdaily.png' alt='MoatDaily' className='w-full h-full object-cover' />
          </div>
        </motion.div>

        {/* Contact (Email) */}
        <motion.button variants={dockItemVariants} whileTap="tap" onClick={handleEmailClick} className='flex flex-col items-center cursor-pointer'>
          <div className='w-[3.2rem] h-[3.2rem] bg-gradient-to-t from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-lg'>
            <IoIosMail size={36} className='text-white' />
          </div>
        </motion.button>

      </div>
    </motion.div>
  );
}
