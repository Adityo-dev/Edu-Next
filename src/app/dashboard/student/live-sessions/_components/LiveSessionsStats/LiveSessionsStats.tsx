'use client';

import StatsCardSkeleton from '@/components/dashboard/Skeletons/StatsCardSkeleton';
import StatsCard from '@/components/dashboard/StatsCard/StatsCard';
import { useGetStudentLiveSessionStatsQuery } from '@/redux/features/liveSessionsManagement/studentLiveSession.api';
import { Calendar, CheckCircle, Radio } from 'lucide-react';

const LiveSessionsStats = () => {
  const { data, isLoading, isError } = useGetStudentLiveSessionStatsQuery();

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
      label: 'Attended',
      value: isError ? '—' : data?.data?.attended || 0,
      icon: CheckCircle,
      iconColor: '#34796f',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {isLoading
        ? [...Array(3)].map((_, i) => (
            <StatsCardSkeleton key={i} className={i === 2 ? 'col-span-2 sm:col-span-1' : ''} />
          ))
        : stats.map((stat, i) => (
            <StatsCard
              key={i}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              iconColor={stat.iconColor}
              className={i === 2 ? 'col-span-2 sm:col-span-1' : ''}
            />
          ))}
    </div>
  );
};

export default LiveSessionsStats;
