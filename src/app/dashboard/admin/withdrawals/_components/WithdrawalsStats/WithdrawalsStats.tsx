import StatsCard from '@/components/dashboard/StatsCard/StatsCard';
import StatsCardSkeleton from '@/components/dashboard/Skeletons/StatsCardSkeleton';
import { useGetWithdrawalStatsQuery } from '@/redux/features/withdrawal/withdrawal.api';
import { Ban, CheckCircle2, Clock, Wallet } from 'lucide-react';

const WithdrawalsStats = () => {
  const { data, isLoading } = useGetWithdrawalStatsQuery();
  const stats = data?.data;
  const statCards = [
    {
      label: 'Pending Requests',
      value: stats?.totalPendingRequests ?? 0,
      iconColor: '#d97706',
      icon: Clock,
    },
    {
      label: 'Total Pending Amount',
      value: `৳${(stats?.totalPendingAmount ?? 0).toLocaleString()}`,
      iconColor: '#475569',
      icon: Wallet,
    },
    {
      label: 'Approved',
      value: stats?.totalApproved ?? 0,
      iconColor: '#34796f',
      icon: CheckCircle2,
    },
    {
      label: 'Rejected',
      value: stats?.totalRejected ?? 0,
      iconColor: '#dc3545',
      icon: Ban,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {isLoading
        ? Array.from({ length: 4 }).map((_, i) => <StatsCardSkeleton key={i} />)
        : statCards.map((stat, i) => (
            <StatsCard
              key={i}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              iconColor={stat.iconColor}
            />
          ))}
    </div>
  );
};

export default WithdrawalsStats;
