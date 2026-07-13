import { BsGithub } from 'react-icons/bs';
import { IoIosMail } from 'react-icons/io';
import { motion } from 'framer-motion';

interface MobileDockProps {
  onOpenQRapid?: () => void;
  onOpenFinder?: () => void;
}

export default function MobileDock({ onOpenQRapid, onOpenFinder }: MobileDockProps) {
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

  const dockItemVariants = {
    tap: { scale: 0.9 }
  };

  return (
    <div className='fixed bottom-0 left-0 right-0 md:hidden z-50'>
      <div className='mx-2 mb-4 p-2 bg-[#1c1c1e]/60 border border-white/10 backdrop-blur-2xl rounded-3xl flex justify-around items-center max-w-[420px] mx-auto'>
        {/* Finder */}
        <motion.div variants={dockItemVariants} whileTap="tap" onClick={onOpenFinder} className='flex flex-col items-center cursor-pointer'>
          <div className='w-12 h-12 rounded-xl flex items-center justify-center shadow-lg overflow-hidden'>
            <img src='/finder.png' alt='Finder' className='w-full h-full object-cover' />
          </div>
        </motion.div>

        {/* QRapid */}
        <motion.div variants={dockItemVariants} whileTap="tap" onClick={onOpenQRapid} className='flex flex-col items-center cursor-pointer'>
          <div className='w-12 h-12 rounded-xl flex items-center justify-center shadow-lg overflow-hidden'>
            <img src='/custom-icon.png' alt='QRapid' className='w-full h-full object-cover' />
          </div>
        </motion.div>

        {/* CareerOS */}
        <motion.div variants={dockItemVariants} whileTap="tap" className='flex flex-col items-center cursor-pointer'>
          <div className='w-12 h-12 rounded-xl flex items-center justify-center shadow-lg overflow-hidden'>
            <img src='/careeros.png' alt='CareerOS' className='w-full h-full object-cover' />
          </div>
        </motion.div>

        {/* Divider */}
        <div className='w-px h-10 bg-white/20 mx-1' />

        {/* LinkedIn */}
        <motion.button variants={dockItemVariants} whileTap="tap" onClick={handleLinkedinClick} className='flex flex-col items-center cursor-pointer'>
          <div className='w-12 h-12 rounded-xl flex items-center justify-center shadow-lg overflow-hidden'>
            <img src='/linkedin.png' alt='LinkedIn' className='w-full h-full object-cover' />
          </div>
        </motion.button>

        {/* Github */}
        <motion.button variants={dockItemVariants} whileTap="tap" onClick={handleGithubClick} className='flex flex-col items-center cursor-pointer'>
          <div className='w-12 h-12 bg-gradient-to-t from-[#2b2b2b] to-[#1c1c1e] border border-white/10 rounded-xl flex items-center justify-center shadow-lg'>
            <BsGithub size={32} className='text-gray-100' />
          </div>
        </motion.button>

        {/* Email */}
        <motion.button variants={dockItemVariants} whileTap="tap" onClick={handleEmailClick} className='flex flex-col items-center cursor-pointer'>
          <div className='w-12 h-12 bg-gradient-to-t from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-lg'>
            <IoIosMail size={32} className='text-white' />
          </div>
        </motion.button>

      </div>
    </div>
  );
}
