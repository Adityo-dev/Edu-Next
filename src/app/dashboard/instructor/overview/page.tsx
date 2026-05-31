'use client';

import WelcomeSection from './_components/WelcomeSection/WelcomeSection';

import WeeklyRevenue from './_components/WeeklyRevenue/WeeklyRevenue';
import RecentStudents from './_components/RecentStudents/RecentStudents';
import QuickActions from './_components/QuickActions/QuickActions';
import WalletSummary from './_components/WalletSummary/WalletSummary';
import InstructorStats from './_components/InstructorStats/InstructorStats';
import MyCourses from './_components/MyCourses/MyCourses';

const InstructorOverviewPage = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <WelcomeSection />

        {/* Stats */}
        <InstructorStats />

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left 2/3 */}
          <div className="space-y-6 lg:col-span-2">
            <MyCourses />
            <WeeklyRevenue />
          </div>

          {/* Right 1/3 */}
          <div className="space-y-6">
            <RecentStudents />
            <QuickActions />
            <WalletSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorOverviewPage;
