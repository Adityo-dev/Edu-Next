'use client';

import StatsCardSkeleton from '@/components/dashboard/Skeletons/StatsCardSkeleton';
import StatsCard from '@/components/dashboard/StatsCard/StatsCard';
import { useGetMyStatsQuery } from '@/redux/features/courseManagement/studentCourse.api';
import { Award, BookOpen, Play, Star } from 'lucide-react';

const CoursesStats = () => {
  const { data, isLoading } = useGetMyStatsQuery();
  const statsData = data?.data;
  console.log(statsData, 'stats data ');

  const stats = [
    {
      label: 'Total Enrolled',
      value: statsData?.totalEnrolled ?? 0,
      icon: BookOpen,
      iconColor: '#10b981',
    },
    {
      label: 'In Progress',
      value: statsData?.inProgress ?? 0,
      icon: Play,
      iconColor: '#3b82f6',
    },
    {
      label: 'Completed',
      value: statsData?.completed ?? 0,
      icon: Star,
      iconColor: '#eab308',
    },
    {
      label: 'Certificates',
      value: statsData?.certificates ?? 0,
      icon: Award,
      iconColor: '#f97316',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {isLoading
        ? [...Array(4)].map((_, i) => <StatsCardSkeleton key={i} />)
        : stats.map((stat, i) => (
            <StatsCard
              key={i}
              icon={stat?.icon}
              iconColor={stat?.iconColor}
              label={stat?.label}
              value={stat?.value}
            />
          ))}
    </div>
  );
};

export default CoursesStats;
