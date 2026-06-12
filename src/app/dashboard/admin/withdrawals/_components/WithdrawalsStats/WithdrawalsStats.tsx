interface Withdrawal {
  status: string;
  amount: number;
}

interface WithdrawalsStatsProps {
  withdrawals: Withdrawal[];
}

const WithdrawalsStats = ({ withdrawals }: WithdrawalsStatsProps) => {
  const totalPending = withdrawals
    .filter((w) => w.status === 'pending')
    .reduce((a, b) => a + b.amount, 0);

  const stats = [
    {
      label: 'Pending Requests',
      value: withdrawals.filter((w) => w.status === 'pending').length,
      color: 'text-yellow-600',
    },
    {
      label: 'Total Pending Amount',
      value: `৳${totalPending.toLocaleString()}`,
      color: 'text-secondary',
    },
    {
      label: 'Approved',
      value: withdrawals.filter((w) => w.status === 'approved').length,
      color: 'text-primary',
    },
    {
      label: 'Rejected',
      value: withdrawals.filter((w) => w.status === 'rejected').length,
      color: 'text-red-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map((stat, i) => (
        <div key={i} className="dashboard-card-container text-center">
          <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
          <p className="text-text-secondary text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default WithdrawalsStats;
