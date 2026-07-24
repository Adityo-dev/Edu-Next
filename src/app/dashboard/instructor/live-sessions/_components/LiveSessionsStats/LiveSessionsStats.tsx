import { Calendar, CheckCircle, Radio } from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard/StatsCard';
import StatsCardSkeleton from '@/components/dashboard/Skeletons/StatsCardSkeleton';
import { useGetInstructorLiveSessionStatsQuery } from '@/redux/features/liveSessionsManagement/instructorLiveSessionApi';

const LiveSessionsStats = () => {
  const { data, isLoading, isError } = useGetInstructorLiveSessionStatsQuery();

  const stats = [
    {
      label: 'Live Now',
      value: isError ? '—' : data?.data?.liveNow || 0,
      icon: Radio,
      iconColor: '#ef4444',
    },
    {
      label: 'Upcoming',
      value: isError ? '—' : data?.data?.upcoming || 0,
      icon: Calendar,
      iconColor: '#3b82f6',
    },
    {
      label: 'Completed',
      value: isError ? '—' : data?.data?.completed || 0,
      icon: CheckCircle,
      iconColor: '#34796f',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {isLoading
        ? [...Array(3)].map((_, i) => <StatsCardSkeleton key={i} />)
        : stats.map((stat, i) => (
            <StatsCard
              key={i}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              iconColor={stat.iconColor}
            />
          ))}
    </div>
  );
};

export default LiveSessionsStats;
