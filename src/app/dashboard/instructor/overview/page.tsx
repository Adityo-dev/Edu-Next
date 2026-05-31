'use client';

import WelcomeSection from './_components/WelcomeSection/WelcomeSection';

import InstructorStats from './_components/InstructorStats/InstructorStats';
import MyCourses from './_components/MyCourses/MyCourses';
import QuickActions from './_components/QuickActions/QuickActions';
import RecentStudents from './_components/RecentStudents/RecentStudents';
import WalletSummary from './_components/WalletSummary/WalletSummary';
import WeeklyRevenue from './_components/WeeklyRevenue/WeeklyRevenue';

const InstructorOverviewPage = () => {
  return (
    <div className="space-y-6">
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
  );
};

export default InstructorOverviewPage;
