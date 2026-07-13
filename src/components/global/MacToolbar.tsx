import { useState, useEffect } from 'react';
import { MdWifi } from 'react-icons/md';
import {
  IoBatteryHalfOutline,
  IoCellular,
} from 'react-icons/io5';
import { FaApple } from 'react-icons/fa';

export default function MacToolbar() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const formatMacDate = (date: Date) => {
    const weekday = date.toLocaleString('en-US', { weekday: 'short' });
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
    const hour = date.toLocaleString('en-US', {
      hour: 'numeric',
      hour12: true,
    });
    const minute = date.getMinutes().toString().padStart(2, '0');
    const period = date.getHours() >= 12 ? 'PM' : 'AM';

    return `${weekday} ${month} ${day} ${hour.replace(
      /\s?[AP]M/,
      ''
    )}:${minute} ${period}`;
  };

  const formatIPhoneTime = (date: Date) => {
    let hour = date.getHours();
    const minute = date.getMinutes().toString().padStart(2, '0');

    hour = hour % 12;
    hour = hour ? hour : 12;

    return `${hour}:${minute}`;
  };

  const handleVSCodeClick = () => {
    window.location.href = 'vscode:/';
  };

  return (
    <>
      <div className='sticky top-0 z-50 md:hidden bg-transparent text-white h-12 px-8 flex items-center justify-between text-base font-medium'>
        <span className='font-semibold'>
          {formatIPhoneTime(currentDateTime)}
        </span>
        <div className='flex items-center gap-1.5'>
          <IoCellular size={20} />
          <MdWifi size={20} />
          <IoBatteryHalfOutline size={24} />
        </div>
      </div>

      <div className='sticky top-0 z-50 hidden md:flex bg-[rgba(20,20,20,0.18)] backdrop-blur-[12px] border-b border-white/[0.05] text-white/90 h-8 px-6 items-center justify-between text-sm font-medium'>
        <div className='flex items-center space-x-4 pl-1'>
          <img src='/memoji.png' alt='Memoji' className='w-4 h-4 rounded-full object-cover shadow-sm opacity-90' />
        </div>
        <div className='flex items-center space-x-4 pr-1'>
          <MdWifi size={16} className='opacity-80 cursor-default' />
          <IoBatteryHalfOutline size={18} className='opacity-80 cursor-default' />
          <span className='cursor-default'>
            {formatMacDate(currentDateTime)}
          </span>
        </div>
      </div>
    </>
  );
}
