'use client';

import { useGetStudentWelcomeStatsQuery } from '@/redux/features/overview/studentOverview.api';
import WelcomeSectionSkeleton from '@/components/dashboard/Skeletons/student/WelcomeSectionSkeleton';

const WelcomeSection = () => {
  const { data, isLoading } = useGetStudentWelcomeStatsQuery();
  const welcomeData = data?.data;

  if (isLoading) return <WelcomeSectionSkeleton />;

  return (
    <div className="bg-primary relative overflow-hidden rounded-md px-8 py-8">
      {/* Dot Grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1.5px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      {/* Glow */}
      <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/5 blur-3xl" />

      <div className="relative z-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-1 text-sm font-medium text-white/60">Welcome back 👋</p>
          <h1 className="text-2xl font-black text-white md:text-3xl">
            {welcomeData?.studentName || 'Student'}
          </h1>
          <p className="mt-2 text-sm text-white/60">
            {welcomeData?.motivationalMessage || (
              <>
                You have{' '}
                <span className="font-bold text-white">
                  {welcomeData?.inProgressCount || 0} courses
                </span>{' '}
                in progress. Keep going!
              </>
            )}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Streak */}
          <div className="rounded-md border border-white/10 bg-white/10 px-5 py-3 text-center backdrop-blur-sm">
            <p className="text-2xl font-black text-yellow-400">
              🔥 {welcomeData?.currentStreak || 0}
            </p>
            <p className="text-xs text-white/60">Day Streak</p>
          </div>
          {/* Weekly Goal */}
          <div className="rounded-md border border-white/10 bg-white/10 px-5 py-3 text-center backdrop-blur-sm">
            <p className="text-2xl font-black text-white">
              {welcomeData?.thisWeekTimeText || '0h'}
            </p>
            <p className="text-xs text-white/60">This Week</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
