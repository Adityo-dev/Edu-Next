'use client';

import StatsCardSkeleton from '@/components/dashboard/Skeletons/StatsCardSkeleton';
import StatsCard from '@/components/dashboard/StatsCard/StatsCard';
import { useGetStudentSummaryCardsQuery } from '@/redux/features/progress/studentProgress.api';
import { Award, BookOpen, Clock, Target } from 'lucide-react';

const ProgressStats = () => {
  const { data, isLoading } = useGetStudentSummaryCardsQuery();
  const summaryCards = data?.data;

  const stats = [
    {
      icon: BookOpen,
      label: 'Lessons Completed',
      value: summaryCards?.lessonsCompleted?.value?.toString() || '0',
      sub: summaryCards?.lessonsCompleted?.subtitle || '',
    },
    {
      icon: Clock,
      label: 'Hours Learned',
      value: summaryCards?.hoursLearned?.value || '0h',
      sub: summaryCards?.hoursLearned?.subtitle || '',
    },
    {
      icon: Target,
      label: 'Quiz Average',
      value: summaryCards?.quizAverage?.value || '0%',
      sub: summaryCards?.quizAverage?.subtitle || '',
    },
    {
      icon: Award,
      label: 'Certificates',
      value: summaryCards?.certificates?.value?.toString() || '0',
      sub: summaryCards?.certificates?.subtitle || '',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {isLoading ? (
        <>
          {[...Array(4)].map((_, i) => (
            <StatsCardSkeleton key={i} hasSub />
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

export default ProgressStats;
