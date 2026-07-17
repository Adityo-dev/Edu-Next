'use client';

import { useGetInstructorReviewStatsQuery } from '@/redux/features/reviews/instructorReview.api';
import { Star } from 'lucide-react';

import { RatingOverviewSkeleton } from '@/components/dashboard/Skeletons/RatingOverviewSkeleton';

const RatingOverview = () => {
  const { data, isLoading } = useGetInstructorReviewStatsQuery();

  if (isLoading) {
    return <RatingOverviewSkeleton />;
  }

  const stats = data?.data;
  const avgRating = stats?.averageRating?.toFixed(1) || '0.0';
  const totalReviews = stats?.totalReviews || 0;

  const ratingBreakdown = [
    { stars: 5, count: stats?.starDistribution?.['5'] || 0 },
    { stars: 4, count: stats?.starDistribution?.['4'] || 0 },
    { stars: 3, count: stats?.starDistribution?.['3'] || 0 },
    { stars: 2, count: stats?.starDistribution?.['2'] || 0 },
    { stars: 1, count: stats?.starDistribution?.['1'] || 0 },
  ];

  return (
    <div className="dashboard-card-container">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="bg-primary/10 flex flex-col items-center justify-center rounded-md px-10 py-4 text-center">
          <span className="text-primary text-5xl font-semibold">{avgRating}</span>
          <div className="my-2 flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} fill="#ffc107" color="#ffc107" />
            ))}
          </div>
          <span className="text-text-secondary text-sm">Course Rating</span>
        </div>
        <div className="flex-1 space-y-2">
          {ratingBreakdown.map((r) => (
            <div key={r.stars} className="flex items-center gap-3">
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="bg-warning h-full rounded-full"
                  style={{ width: `${totalReviews > 0 ? (r.count / totalReviews) * 100 : 0}%` }}
                />
              </div>
              <div className="flex shrink-0 items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={11} fill={i < r.stars ? '#ffc107' : 'none'} color="#ffc107" />
                ))}
              </div>
              <span className="text-text-secondary w-12 text-right text-sm">{r.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingOverview;
