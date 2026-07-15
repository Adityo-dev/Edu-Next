'use client';

import { Ban, GraduationCap, UserCheck, Users } from 'lucide-react';
import { useGetUserStatsQuery } from '@/redux/features/admin/userManagement/userManagement.api';
import StatsCard from '@/components/dashboard/StatsCard/StatsCard';
import StatsCardSkeleton from '@/components/dashboard/Skeletons/StatsCardSkeleton';

const UsersStats = () => {
  const { data, isLoading } = useGetUserStatsQuery();

  const stats = [
    {
      label: 'Total Users',
      value: data?.data.totalUsers || 0,
      icon: Users,
      iconColor: '#3b82f6',
    },
    {
      label: 'Students',
      value: data?.data.totalStudents || 0,
      icon: GraduationCap,
      iconColor: '#8b5cf6',
    },
    {
      label: 'Instructors',
      value: data?.data.totalInstructors || 0,
      icon: UserCheck,
      iconColor: '#34796f',
    },
    {
      label: 'Suspended',
      value: data?.data.totalSuspended || 0,
      icon: Ban,
      iconColor: '#ef4444',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {isLoading
        ? [...Array(4)].map((_, i) => <StatsCardSkeleton key={i} />)
        : stats.map((stat, i) => (
            <StatsCard
              key={i}
              icon={stat.icon}
              iconColor={stat.iconColor}
              label={stat.label}
              value={stat.value}
            />
          ))}
    </div>
  );
};

export default UsersStats;
