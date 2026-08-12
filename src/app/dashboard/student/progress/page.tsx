'use client';

import SectionHeader from '@/components/dashboard/SectionHeader/SectionHeader';
import Achievements from './_components/Achievements/Achievements';
import MotivationalBanner from './_components/MotivationalBanner/MotivationalBanner';
import OverallProgress from './_components/OverallProgress/OverallProgress';
import ProgressStats from './_components/ProgressStats/ProgressStats';
import ProgressTabs from './_components/ProgressTabs/ProgressTabs';
import WeeklyActivity from './_components/WeeklyActivity/WeeklyActivity';

const StudentProgressPage = () => {
  return (
    <section className="mx-auto space-y-6">
      <SectionHeader
        title="My Progress"
        description="Track your learning journey — lessons, quizzes, and skills."
      />

      {/* Stats Row */}
      <ProgressStats />

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left (2/3) */}
        <div className="space-y-6 lg:col-span-2">
          <ProgressTabs />
        </div>

        {/* Right (1/3) */}
        <div className="space-y-5">
          <WeeklyActivity />
          <OverallProgress />
          <Achievements />
          <MotivationalBanner />
        </div>
      </div>
    </section>
  );
};

export default StudentProgressPage;
