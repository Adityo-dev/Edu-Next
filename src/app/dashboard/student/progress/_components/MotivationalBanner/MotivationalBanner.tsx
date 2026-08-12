'use client';

import MotivationalBannerSkeleton from '@/components/dashboard/Skeletons/student/MotivationalBannerSkeleton';
import { useGetStudentWeeklyGoalQuery } from '@/redux/features/progress/studentProgress.api';
import { Zap } from 'lucide-react';

const MotivationalBanner = () => {
  const { data, isLoading } = useGetStudentWeeklyGoalQuery();
  const goalData = data?.data;

  if (isLoading) {
    return <MotivationalBannerSkeleton />;
  }

  return (
    <div className="bg-primary rounded-md p-5 text-center">
      <Zap size={24} className="text-warning mx-auto mb-3" />
      <p className="text-sm font-bold text-white">
        You are in the top <span className="text-warning">{goalData?.percentile ?? 100}%</span> of
        learners this week!
      </p>
      <p className="text-text mt-1 text-xs text-white/60">
        {goalData?.progressText || 'Keep it up to hit your weekly goal.'}
      </p>
    </div>
  );
};

export default MotivationalBanner;
