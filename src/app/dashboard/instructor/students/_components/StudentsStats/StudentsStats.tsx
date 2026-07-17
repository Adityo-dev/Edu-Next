import StatsCardSkeleton from '@/components/dashboard/Skeletons/StatsCardSkeleton';
import StatsCard from '@/components/dashboard/StatsCard/StatsCard';
import { useGetInstructorStudentsStatsQuery } from '@/redux/features/courseManagement/instructorCourse.api';
import { Activity, GraduationCap, Star, Trophy } from 'lucide-react';

const StudentsStats = () => {
  const { data: response, isLoading } = useGetInstructorStudentsStatsQuery();
  const statsData = response?.data;

  const stats = [
    {
      icon: GraduationCap,
      label: 'Total Students',
      value: statsData?.totalStudents ?? 0,
      iconColor: '#3b82f6',
    },
    {
      icon: Activity,
      label: 'Active This Week',
      value: statsData?.activeThisWeek ?? 0,
      iconColor: '#10b981',
    },
    {
      icon: Trophy,
      label: 'Completed',
      value: statsData?.completed ?? 0,
      iconColor: '#8b5cf6',
    },
    {
      icon: Star,
      label: 'With Reviews',
      value: statsData?.withReviews ?? 0,
      iconColor: '#f59e0b',
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

export default StudentsStats;
