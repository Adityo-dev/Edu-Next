'use client';

import LiveSessionsHeader from './_components/LiveSessionsHeader/LiveSessionsHeader';
import LiveSessionsList from './_components/LiveSessionsList/LiveSessionsList';
import LiveSessionsStats from './_components/LiveSessionsStats/LiveSessionsStats';

const InstructorLiveSessionsPage = () => {
  return (
    <section className="space-y-6">
      <LiveSessionsHeader />
      <LiveSessionsStats />
      <LiveSessionsList />
    </section>
  );
};

export default InstructorLiveSessionsPage;
