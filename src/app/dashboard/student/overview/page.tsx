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
      {/* Welcome Section */}
      <WelcomeSection />

      {/* Stats Cards */}
      <StudentStats />

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left (2/3) */}
        <div className="space-y-6 lg:col-span-2">
          <ContinueLearning />
          <MyCertificates />
        </div>

        {/* Right (1/3) */}
        <div className="space-y-6">
          <UpcomingLiveSessions />
          <WeeklyActivity />
          <CourseProgress />
        </div>
      </div>
    </section>
  );
};

export default StudentOverviewPage;
