'use client';

import ContinueLearning from './_components/ContinueLearning/ContinueLearning';
import CourseProgress from './_components/CourseProgress/CourseProgress';
import MyCertificates from './_components/MyCertificates/MyCertificates';
import WeeklyActivity from '../progress/_components/WeeklyActivity/WeeklyActivity';
import StudentStats from './_components/StudentStats/StudentStats';
import UpcomingLiveSessions from './_components/UpcomingLiveSessions/UpcomingLiveSessions';
import WelcomeSection from './_components/WelcomeSection/WelcomeSection';

const StudentOverviewPage = () => {
  return (
    <section className="space-y-6">
      <WelcomeSection />

      {/* Stats Cards */}
      <StudentStats />

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left (2/3) */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <ContinueLearning />
          {/* Desktop Only MyCertificates */}
          <div className="hidden lg:block">
            <MyCertificates />
          </div>
        </div>

        {/* Right (1/3) */}
        <div className="flex flex-col gap-6">
          <UpcomingLiveSessions />
          <WeeklyActivity />
          <CourseProgress />
        </div>

        {/* Mobile Only MyCertificates at the bottom */}
        <div className="block lg:hidden">
          <MyCertificates />
        </div>
      </div>
    </section>
  );
};

export default StudentOverviewPage;
