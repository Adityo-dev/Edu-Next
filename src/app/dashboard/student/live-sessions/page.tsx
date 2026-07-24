import SectionHeader from '@/components/dashboard/SectionHeader/SectionHeader';
import LiveSessionsList from './_components/LiveSessionsList/LiveSessionsList';
import LiveSessionsStats from './_components/LiveSessionsStats/LiveSessionsStats';

const LiveSessionsPage = () => {
  return (
    <section className="space-y-6">
      <SectionHeader
        title="Live Sessions"
        description="Join your live classes and interact with instructors."
      />
      <LiveSessionsStats />
      <LiveSessionsList />
    </section>
  );
};

export default LiveSessionsPage;
