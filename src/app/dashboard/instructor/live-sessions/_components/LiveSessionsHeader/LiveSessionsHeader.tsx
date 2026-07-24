import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import SectionHeader from '@/components/dashboard/SectionHeader/SectionHeader';

const LiveSessionsHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <SectionHeader title="Live Sessions" description="Schedule and manage your live classes." />
      <DynamicActionButton
        label="Schedule Session"
        showIcon
        href="/dashboard/instructor/live-sessions/create"
        className="h-11!"
      />
    </div>
  );
};

export default LiveSessionsHeader;
