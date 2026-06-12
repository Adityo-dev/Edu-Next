'use client';

import WelcomeSection from './_components/WelcomeSection/WelcomeSection';
import StudentStats from './_components/StudentStats/StudentStats';
import ContinueLearning from './_components/ContinueLearning/ContinueLearning';
import MyCertificates from './_components/MyCertificates/MyCertificates';
import UpcomingLiveSessions from './_components/UpcomingLiveSessions/UpcomingLiveSessions';
import RecentActivity from './_components/RecentActivity/RecentActivity';
import CourseProgress from './_components/CourseProgress/CourseProgress';

const StudentOverviewPage = () => {
  return (
    <div className="min-h-screen">
      <div className="mx-auto space-y-6">
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
            <RecentActivity />
            <CourseProgress />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentOverviewPage;
