'use client';

import { useGetStudentAchievementsQuery } from '@/redux/features/progress/studentProgress.api';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AchievementsSkeleton from '@/components/dashboard/Skeletons/student/AchievementsSkeleton';

const Achievements = () => {
  const { data, isLoading } = useGetStudentAchievementsQuery();
  const achievements = data?.data || [];

  return (
    <div className="dashboard-card-container">
      <h3 className="mb-4 text-base font-semibold">Achievements</h3>
      <div className="grid grid-cols-3 gap-3">
        <TooltipProvider delayDuration={200}>
          {isLoading
            ? [...Array(6)].map((_, i) => <AchievementsSkeleton key={i} />)
            : achievements.map((badge, i) => (
                <Tooltip key={i}>
                  <TooltipTrigger asChild>
                    <div
                      className={`flex cursor-pointer flex-col items-center justify-center rounded-sm p-3 text-center transition-all ${
                        badge?.isUnlocked
                          ? 'border border-emerald-100 bg-emerald-50 hover:bg-emerald-100'
                          : 'border border-slate-100 bg-slate-50 opacity-50 hover:opacity-70'
                      }`}
                    >
                      <span className="mb-1 text-2xl">{badge?.icon}</span>
                      <span className="text-xs leading-tight font-semibold">{badge?.title}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-[200px] text-center">
                    <p className="font-semibold text-white">{badge?.title}</p>
                    <p className="mt-1 text-xs">{badge?.description}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Achievements;
