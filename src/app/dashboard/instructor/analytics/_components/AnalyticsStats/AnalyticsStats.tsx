'use client';

import StatsCardSkeleton from '@/components/dashboard/Skeletons/StatsCardSkeleton';
import StatsCard from '@/components/dashboard/StatsCard/StatsCard';
import { useGetInstructorAnalyticsStatsQuery } from '@/redux/features/courseManagement/instructorCourse.api';
import { CircleDollarSign, Eye, Star, Users } from 'lucide-react';

const AnalyticsStats = () => {
  const { data: response, isLoading } = useGetInstructorAnalyticsStatsQuery();
  const statsData = response?.data;

  const stats = [
    {
      icon: CircleDollarSign,
      label: 'Total Revenue',
      value: `৳${statsData?.revenue?.total?.toLocaleString() ?? 0}`,
      sub: `+৳${statsData?.revenue?.thisMonth?.toLocaleString() ?? 0} this month`,
      iconColor: '#10b981',
    },
    {
      icon: Users,
      label: 'Total Students',
      value: statsData?.students?.total?.toLocaleString() ?? '0',
      sub: `+${statsData?.students?.thisMonth?.toLocaleString() ?? 0} this month`,
      iconColor: '#3b82f6',
    },
    {
      icon: Eye,
      label: 'Course Views',
      value: statsData?.views?.total?.toLocaleString() ?? '0',
      sub: `+${statsData?.views?.thisMonth?.toLocaleString() ?? 0} this month`,
      iconColor: '#8b5cf6',
    },
    {
      icon: Star,
      label: 'Avg Rating',
      value: statsData?.rating?.average?.toFixed(1) ?? '0.0',
      sub: `Based on ${statsData?.rating?.totalReviews ?? 0} reviews`,
      iconColor: '#f59e0b',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {isLoading
        ? [...Array(4)].map((_, i) => <StatsCardSkeleton key={i} hasSub />)
        : stats.map((stat, i) => (
            <StatsCard
              key={i}
              icon={stat.icon}
              iconColor={stat.iconColor}
              label={stat.label}
              value={stat.value}
              sub={stat.sub}
            />
          ))}
    </div>
  );
};

export default AnalyticsStats;
