'use client';

import { useGetInstructorCourseStatsQuery } from '@/redux/features/courseManagement/instructorCourse.api';
import { BookOpen, CheckCircle, Clock, FileText, XCircle, AlertTriangle } from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard/StatsCard';
import StatsCardSkeleton from '@/components/dashboard/Skeletons/StatsCardSkeleton';

const CoursesStats = () => {
  const { data, isLoading } = useGetInstructorCourseStatsQuery();
  const stats = data?.data;

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <StatsCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  const statItems = [
    {
      label: 'Total Courses',
      value: stats?.totalCourses || 0,
      icon: BookOpen,
      iconColor: '#3b82f6',
    },
    {
      label: 'Published',
      value: stats?.published || 0,
      icon: CheckCircle,
      iconColor: '#10b981',
    },
    {
      label: 'Pending',
      value: stats?.pending || 0,
      icon: Clock,
      iconColor: '#f59e0b',
    },
    {
      label: 'Draft',
      value: stats?.draft || 0,
      icon: FileText,
      iconColor: '#94a3b8',
    },
    {
      label: 'Rejected',
      value: stats?.rejected || 0,
      icon: XCircle,
      iconColor: '#ef4444',
    },
    {
      label: 'Suspended',
      value: stats?.suspended || 0,
      icon: AlertTriangle,
      iconColor: '#f97316',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
      {statItems.map((stat, i) => (
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

export default CoursesStats;
