'use client';

import StatsCardSkeleton from '@/components/dashboard/Skeletons/StatsCardSkeleton';
import StatsCard from '@/components/dashboard/StatsCard/StatsCard';
import { useGetOverviewStatsQuery } from '@/redux/features/admin/dashboard/dashboard.api';
import { BadgePercent, BookOpen, CircleDollarSign, Users } from 'lucide-react';

const AdminStats = () => {
  const { data, isLoading } = useGetOverviewStatsQuery();
  const statsData = data?.data;

  const stats = [
    {
      icon: Users,
      label: 'Total Users',
      value: statsData?.totalUsers?.toLocaleString() ?? 0,
      sub: `+${statsData?.newUsersThisMonth?.toLocaleString() ?? 0} this month`,
      iconColor: '#3b82f6',
    },
    {
      icon: BookOpen,
      label: 'Total Courses',
      value: statsData?.totalCourses?.toLocaleString() ?? 0,
      sub: `+${statsData?.newCoursesThisMonth?.toLocaleString() ?? 0} this month`,
      iconColor: '#8b5cf6',
    },
    {
      icon: CircleDollarSign,
      label: 'Total Revenue',
      value: `৳${statsData?.totalRevenue?.toLocaleString() ?? 0}`,
      sub: `+৳${statsData?.newRevenueThisMonth?.toLocaleString() ?? 0} this month`,
      iconColor: '#34796f',
    },
    {
      icon: BadgePercent,
      label: 'Commission Earned',
      value: `৳${statsData?.totalCommission?.toLocaleString() ?? 0}`,
      sub: 'Total commission',
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
              icon={stat?.icon}
              iconColor={stat?.iconColor}
              label={stat?.label}
              value={stat?.value}
              sub={stat?.sub}
            />
          ))}
    </div>
  );
};

export default AdminStats;
