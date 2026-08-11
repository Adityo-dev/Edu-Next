'use client';

import StatsCardSkeleton from '@/components/dashboard/Skeletons/StatsCardSkeleton';
import StatsCard from '@/components/dashboard/StatsCard/StatsCard';
import { useGetMyCourseStatsQuery } from '@/redux/features/overview/studentOverview.api';
import { Award, BookOpen, Clock, TrendingUp } from 'lucide-react';

const StudentStats = () => {
  const { data, isLoading } = useGetMyCourseStatsQuery();
  const overviewStats = data?.data;

  const stats = [
    {
      icon: BookOpen,
      label: 'Enrolled Courses',
      value: overviewStats?.enrolledCourses?.total || 0,
      sub: `+${overviewStats?.enrolledCourses?.thisMonth || 0} this month`,
    },
    {
      icon: TrendingUp,
      label: 'Completed',
      value: overviewStats?.completed?.total || 0,
      sub: `${overviewStats?.completed?.completionRate || 0}% completion rate`,
    },
    {
      icon: Award,
      label: 'Certificates',
      value: overviewStats?.certificates?.total || 0,
      sub: overviewStats?.certificates?.text || 'Download anytime',
    },
    {
      icon: Clock,
      label: 'Hours Learned',
      value: overviewStats?.hoursLearned?.total || '0h',
      sub: `${overviewStats?.hoursLearned?.thisWeek || '0h'} this week`,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {isLoading ? (
        <>
          {[...Array(4)].map((_, i) => (
            <StatsCardSkeleton key={i} />
          ))}
        </>
      ) : (
        stats.map((stat, i) => (
          <StatsCard
            key={i}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            sub={stat.sub}
          />
        ))
      )}
    </div>
  );
};

export default StudentStats;
