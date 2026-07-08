interface InstructorsStatsProps {
  pendingCount: number;
}

const InstructorsStats = ({ pendingCount }: InstructorsStatsProps) => {
  const stats = [
    {
      label: 'Pending Badge Requests',
      value: pendingCount,
      color: 'text-yellow-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {stats.map((stat, i) => (
        <div key={i} className="dashboard-card-container text-center">
          <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
          <p className="text-text-secondary text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default InstructorsStats;
