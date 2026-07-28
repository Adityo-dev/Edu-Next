'use client';

import StatsCardSkeleton from '@/components/dashboard/Skeletons/StatsCardSkeleton';
import StatsCard from '@/components/dashboard/StatsCard/StatsCard';
import { useGetStudentReviewStatsQuery } from '@/redux/features/reviews/studentReview.api';
import { CheckCircle, Clock, MessageSquare } from 'lucide-react';

const ReviewsStats = () => {
  const { data: statsData, isLoading } = useGetStudentReviewStatsQuery();

  const stats = [
    {
      icon: MessageSquare,
      label: 'Total Reviews',
      value: statsData?.data?.total || 0,
      sub: 'Across all courses',
    },
    {
      icon: CheckCircle,
      label: 'Published',
      value: statsData?.data?.published || 0,
      sub: 'Visible on courses',
    },
    {
      icon: Clock,
      label: 'Pending',
      value: statsData?.data?.pending || 0,
      sub: 'Awaiting moderation',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {isLoading ? (
        <>
          {[...Array(3)].map((_, i) => (
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

export default ReviewsStats;
