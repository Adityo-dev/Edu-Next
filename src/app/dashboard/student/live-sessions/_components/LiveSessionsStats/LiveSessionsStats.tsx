'use client';

interface LiveSessionsStatsProps {
  liveCount: number;
  upcomingCount: number;
  completedCount: number;
}

const LiveSessionsStats = ({
  liveCount,
  upcomingCount,
  completedCount,
}: LiveSessionsStatsProps) => {
  const stats = [
    {
      label: 'Live Now',
      value: liveCount,
      color: 'text-red-500',
    },
    {
      label: 'Upcoming',
      value: upcomingCount,
      color: 'text-blue-600',
    },
    {
      label: 'Attended',
      value: completedCount,
      color: 'text-primary',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="dashboard-card-container text-center">
          <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
          <p className="text-text-secondary mt-1 text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default LiveSessionsStats;
