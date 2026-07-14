import { IoIosMail } from 'react-icons/io';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useStartupPhase } from '../../context/StartupContext';

interface MobileDockProps {
  onOpenQRapid?: () => void;
  onOpenFinder?: () => void;
}

export default function MobileDock({ onOpenQRapid }: MobileDockProps) {
  const phase = useStartupPhase();
  const qRapidControls = useAnimation();

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
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 16px)' }}
    >
      <div className='mb-[16px] py-[12px] px-5 bg-[#1a1a1c]/80 border border-white/10 backdrop-blur-3xl rounded-[32px] flex justify-between items-start w-[88%] max-w-[360px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto'>
        
        {/* QRapid */}
        <motion.div variants={dockItemVariants} whileTap="tap" onClick={onOpenQRapid} animate={qRapidControls} className='flex flex-col items-center cursor-pointer gap-[4px]'>
          <div className='w-[48px] h-[48px] rounded-[12px] flex items-center justify-center shadow-lg overflow-hidden'>
            <img src='/custom-icon.png' alt='QRapid' className='w-full h-full object-cover' />
          </div>
          <span className="text-[10px] font-medium text-white/90 tracking-wide">QRapid</span>
        </motion.div>

        {/* CareerOS */}
        <motion.div variants={dockItemVariants} whileTap="tap" className='flex flex-col items-center cursor-pointer gap-[4px]'>
          <div className='w-[48px] h-[48px] rounded-[12px] flex items-center justify-center shadow-lg overflow-hidden bg-white'>
            <img src='/careeros.png' alt='CareerOS' className='w-full h-full object-cover' />
          </div>
          <span className="text-[10px] font-medium text-white/90 tracking-wide">CareerOS</span>
        </motion.div>

        {/* MoatDaily */}
        <motion.div variants={dockItemVariants} whileTap="tap" className='flex flex-col items-center cursor-pointer gap-[4px]'>
          <div className='w-[48px] h-[48px] rounded-[12px] flex items-center justify-center shadow-lg overflow-hidden border border-white/15 bg-black'>
            <img src='/moatdaily.png' alt='MoatDaily' className='w-full h-full object-cover' />
          </div>
          <span className="text-[10px] font-medium text-white/90 tracking-wide">MoatDaily</span>
        </motion.div>

        {/* Contact */}
        <motion.button variants={dockItemVariants} whileTap="tap" onClick={handleEmailClick} className='flex flex-col items-center cursor-pointer gap-[4px]'>
          <div className='w-[48px] h-[48px] bg-[#007AFF] rounded-[12px] flex items-center justify-center shadow-lg'>
            <IoIosMail size={32} className='text-white' />
          </div>
          <span className="text-[10px] font-medium text-white/90 tracking-wide">Contact</span>
        </motion.button>

      </div>
    </motion.div>
  );
}
