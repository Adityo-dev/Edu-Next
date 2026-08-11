'use client';

import { Award, BookOpen, Clock, Target } from 'lucide-react';
import { useGetStudentSummaryCardsQuery } from '@/redux/features/progress/studentProgress.api';
import StatsCardSkeleton from '@/components/dashboard/Skeletons/StatsCardSkeleton';

const ProgressStats = () => {
  const { data, isLoading } = useGetStudentSummaryCardsQuery();
  const summaryCards = data?.data;

  const stats = [
    {
      icon: <BookOpen size={20} />,
      label: 'Lessons Completed',
      value: summaryCards?.lessonsCompleted?.value?.toString() || '0',
      sub: summaryCards?.lessonsCompleted?.subtitle || '',
    },
    {
      icon: <Clock size={20} />,
      label: 'Hours Learned',
      value: summaryCards?.hoursLearned?.value || '0h',
      sub: summaryCards?.hoursLearned?.subtitle || '',
    },
    {
      icon: <Target size={20} />,
      label: 'Quiz Average',
      value: summaryCards?.quizAverage?.value || '0%',
      sub: summaryCards?.quizAverage?.subtitle || '',
    },
    {
      icon: <Award size={20} />,
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
            <StatsCardSkeleton key={i} />
          ))}
        </>
      ) : (
        stats.map((stat, i) => (
          <div
            key={i}
            className="dashboard-card-container transition-all hover:border-emerald-100 hover:shadow-sm"
          >
            <div className="text-primary mb-3 inline-flex h-10 w-10 items-center justify-center rounded-sm bg-emerald-50">
              {stat.icon}
            </div>
            <p className="text-text-primary text-2xl font-black">{stat.value}</p>
            <p className="text-sm font-semibold text-slate-600">{stat.label}</p>
            <p className="text-text-secondary mt-0.5 text-xs">{stat.sub}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ProgressStats;
