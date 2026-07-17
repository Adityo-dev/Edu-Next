'use client';

import SectionHeader from '@/components/dashboard/SectionHeader/SectionHeader';
import AnalyticsStats from './_components/AnalyticsStats/AnalyticsStats';
import CoursePerformance from './_components/CoursePerformance/CoursePerformance';
import GrowthRate from './_components/GrowthRate/GrowthRate';
import RevenueOverview from './_components/RevenueOverview/RevenueOverview';

const InstructorAnalyticsPage = () => {
  return (
    <section className="space-y-6">
      <SectionHeader title="Analytics" description="Track your course performance and earnings." />
      <AnalyticsStats />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <RevenueOverview />
        <GrowthRate />
      </div>

      <CoursePerformance />
    </section>
  );
};

export default InstructorAnalyticsPage;
