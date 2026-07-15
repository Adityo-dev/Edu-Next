'use client';

import { CheckCircle, Clock, Star, XCircle } from 'lucide-react';
import { useGetAdminReviewStatsQuery } from '@/redux/features/reviews/adminReview.api';
import StatsCard from '@/components/dashboard/StatsCard/StatsCard';
import StatsCardSkeleton from '@/components/dashboard/Skeletons/StatsCardSkeleton';

const ReviewsStats = () => {
  const { data, isLoading } = useGetAdminReviewStatsQuery();

  const stats = [
    {
      label: 'Total Reviews',
      value: data?.data?.total || 0,
      icon: Star,
      iconColor: '#3b82f6',
    },
    {
      label: 'Pending',
      value: data?.data?.pending || 0,
      icon: Clock,
      iconColor: '#f59e0b',
    },
    {
      label: 'Approved',
      value: data?.data?.published || 0,
      icon: CheckCircle,
      iconColor: '#34796f',
    },
    {
      label: 'Rejected',
      value: data?.data?.rejected || 0,
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

export default ReviewsStats;
