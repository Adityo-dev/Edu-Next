'use client';

interface ReviewsStatsProps {
  totalCount: number;
  publishedCount: number;
  pendingCount: number;
}

const ReviewsStats = ({ totalCount, publishedCount, pendingCount }: ReviewsStatsProps) => {
  const stats = [
    { label: 'Total Reviews', value: totalCount },
    { label: 'Published', value: publishedCount },
    { label: 'Pending', value: pendingCount },
  ];

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
