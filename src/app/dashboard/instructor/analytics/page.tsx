'use client';

import AnalyticsStats from './_components/AnalyticsStats/AnalyticsStats';
import RevenueOverview from './_components/RevenueOverview/RevenueOverview';
import GrowthRate from './_components/GrowthRate/GrowthRate';
import CoursePerformance from './_components/CoursePerformance/CoursePerformance';

const InstructorAnalyticsPage = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-text-primary text-2xl font-black">Analytics</h1>
          <p className="text-text-secondary mt-1 text-sm">
            Track your course performance and earnings.
          </p>
        </div>

        {/* Stats */}
        <AnalyticsStats />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Revenue Chart */}
          <RevenueOverview />

          {/* Top Course */}
          <GrowthRate />
        </div>

        {/* Course Performance */}
        <CoursePerformance />
      </div>
    </div>
  );
};

export default InstructorAnalyticsPage;
