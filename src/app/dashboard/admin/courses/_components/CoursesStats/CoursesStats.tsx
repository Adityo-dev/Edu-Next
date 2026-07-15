'use client';

import { BookOpen, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useGetAdminCourseStatsQuery } from '@/redux/features/courseManagement/adminCourse.api';
import StatsCard from '@/components/dashboard/StatsCard/StatsCard';
import StatsCardSkeleton from '@/components/dashboard/Skeletons/StatsCardSkeleton';

const CoursesStats = () => {
  const { data, isLoading } = useGetAdminCourseStatsQuery();

  const stats = [
    {
      label: 'Total Courses',
      value: data?.data.totalCourses || 0,
      icon: BookOpen,
      iconColor: '#3b82f6',
    },
    {
      label: 'Published',
      value: data?.data.published || 0,
      icon: CheckCircle,
      iconColor: '#34796f',
    },
    {
      label: 'Pending',
      value: data?.data.pending || 0,
      icon: Clock,
      iconColor: '#f59e0b',
    },
    {
      label: 'Rejected',
      value: data?.data.rejected || 0,
      icon: XCircle,
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

export default CoursesStats;
