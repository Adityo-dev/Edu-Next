'use client';

import { Zap } from 'lucide-react';

const MotivationalBanner = () => {
  return (
    <div className="bg-primary rounded-md p-5 text-center">
      <Zap size={24} className="mx-auto mb-3 text-yellow-400" />
      <p className="text-sm font-bold text-white">
        You are in the top <span className="text-yellow-400">15%</span> of learners this week!
      </p>
      <p className="text-text mt-1 text-xs text-white/60">
        Keep it up — 3 more lessons to hit your weekly goal.
      </p>
    </div>
  );
};

export default MotivationalBanner;
