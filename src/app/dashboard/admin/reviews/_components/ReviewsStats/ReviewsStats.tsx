'use client';

import { useGetAdminReviewStatsQuery } from '@/redux/features/reviews/adminReview.api';

const ReviewsStats = () => {
  const { data, isLoading } = useGetAdminReviewStatsQuery();

  const stats = [
    {
      label: 'Total',
      value: data?.data?.total || 0,
      color: 'text-slate-800',
    },
    {
      label: 'Pending',
      value: data?.data?.pending || 0,
      color: 'text-yellow-600',
    },
    {
      label: 'Approved',
      value: data?.data?.published || 0,
      color: 'text-primary',
    },
    {
      label: 'Rejected',
      value: data?.data?.rejected || 0,
      color: 'text-red-500',
    },
  ];

  if (isLoading) {
    return <div className="h-28 w-full animate-pulse rounded-xl bg-slate-200"></div>;
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="dashboard-card-container py-6 text-center">
          <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
          <p className="text-text-secondary text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewsStats;
