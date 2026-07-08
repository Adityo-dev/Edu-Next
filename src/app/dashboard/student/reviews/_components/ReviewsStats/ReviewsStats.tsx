'use client';

import { useGetStudentReviewStatsQuery } from '@/redux/features/reviews/studentReview.api';

const ReviewsStats = () => {
  const { data: statsData, isLoading } = useGetStudentReviewStatsQuery();

  const stats = [
    { label: 'Total Reviews', value: statsData?.data?.total || 0 },
    { label: 'Published', value: statsData?.data?.published || 0 },
    { label: 'Pending', value: statsData?.data?.pending || 0 },
  ];

  if (isLoading) {
    return <div className="h-28 w-full animate-pulse rounded-xl bg-slate-200"></div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="dashboard-card-container text-center">
          <p className="text-primary text-3xl font-black">{stat.value}</p>
          <p className="text-text-secondary text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewsStats;
