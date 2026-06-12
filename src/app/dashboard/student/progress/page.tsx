'use client';

import ProgressHeader from './_components/ProgressHeader/ProgressHeader';
import ProgressStats from './_components/ProgressStats/ProgressStats';
import ProgressTabs from './_components/ProgressTabs/ProgressTabs';
import WeeklyActivity from './_components/WeeklyActivity/WeeklyActivity';
import OverallProgress from './_components/OverallProgress/OverallProgress';
import Achievements from './_components/Achievements/Achievements';
import MotivationalBanner from './_components/MotivationalBanner/MotivationalBanner';

const StudentProgressPage = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <ProgressHeader />

        {/* Stats Row */}
        <ProgressStats />

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left (2/3) */}
          <div className="space-y-6 lg:col-span-2">
            <ProgressTabs />
          </div>

          {/* Right (1/3) */}
          <div className="space-y-6">
            <WeeklyActivity />
            <OverallProgress />
            <Achievements />
            <MotivationalBanner />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProgressPage;
