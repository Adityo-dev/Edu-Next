'use client';

import InstructorWelcomeSkeleton from '@/components/dashboard/Skeletons/Instructor/InstructorWelcomeSkeleton';
import { useGetInstructorWelcomeStatsQuery } from '@/redux/features/overview/instructorOverview.api';

const WelcomeSection = () => {
  const { data, isLoading } = useGetInstructorWelcomeStatsQuery();
  const stats = data?.data;

  if (isLoading) return <InstructorWelcomeSkeleton />;

  const name = stats?.instructorName || 'Instructor';
  const activeCourses = stats?.activeCourses || 0;
  const pendingCourses = stats?.pendingCourses || 0;
  const avgRating = stats?.avgRating || 0;
  const totalCourses = stats?.totalCourses || 0;

  return (
    <div className="bg-primary dashboard-card-container sm:px-6 sm:py-6">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1.5px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/5 blur-3xl" />
      <div className="relative z-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-1 text-sm text-white/80">Welcome back 👋</p>
          <h1 className="text-2xl font-bold text-white md:text-3xl">{name}</h1>
          <p className="mt-2 text-sm text-white/60">
            You have{' '}
            <span className="font-semibold text-white">{activeCourses} active courses</span> and{' '}
            <span className="font-semibold text-white">{pendingCourses} pending approval.</span>
          </p>
        </div>
        <div className="flex gap-4">
          <div className="w-full rounded-sm border border-white/10 bg-white/10 px-6 py-2.5 text-center backdrop-blur-sm sm:min-w-32.5">
            <p className="text-warning text-2xl font-semibold">{avgRating}</p>
            <p className="text-subtle text-xs">Avg Rating</p>
          </div>
          <div className="w-full rounded-sm border border-white/10 bg-white/10 px-6 py-2.5 text-center backdrop-blur-sm sm:min-w-32.5">
            <p className="text-2xl font-semibold text-white">{totalCourses}</p>
            <p className="text-subtle text-xs">Courses</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
