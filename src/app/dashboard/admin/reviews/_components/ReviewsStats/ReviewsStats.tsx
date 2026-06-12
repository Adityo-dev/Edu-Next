interface Review {
  status: string;
}

interface ReviewsStatsProps {
  reviews: Review[];
}

const ReviewsStats = ({ reviews }: ReviewsStatsProps) => {
  const stats = [
    {
      label: 'Pending',
      value: reviews.filter((r) => r.status === 'pending').length,
      color: 'text-yellow-600',
    },
    {
      label: 'Approved',
      value: reviews.filter((r) => r.status === 'approved').length,
      color: 'text-primary',
    },
    {
      label: 'Rejected',
      value: reviews.filter((r) => r.status === 'rejected').length,
      color: 'text-red-500',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="dashboard-card-container text-center">
          <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
          <p className="text-text-secondary text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewsStats;
