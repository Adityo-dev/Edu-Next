'use client';

import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  targetDate: string | Date;
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<string>('Calculating...');

  useEffect(() => {
    const targetTime = new Date(targetDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (isNaN(difference)) {
        setTimeLeft('Time unknown');
        return;
      }

      if (difference <= 0) {
        setTimeLeft('Starting any moment!');
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      if (days > 0) {
        setTimeLeft(`Starts in ${days}d ${hours}h`);
      } else if (hours > 0) {
        setTimeLeft(`Starts in ${hours}h ${minutes}m`);
      } else {
        setTimeLeft(`Starts in ${minutes}m ${seconds}s`);
      }
    };

    // Run immediately to avoid initial delay
    updateTimer();
    
    // Set interval for every second
    const interval = setInterval(updateTimer, 1000);

    // Cleanup on unmount to prevent memory leaks
    return () => clearInterval(interval);
  }, [targetDate]);

  return <DynamicBadge text={timeLeft} color="#10b981" size="sm" icon={Clock} />;
};

export default CountdownTimer;
