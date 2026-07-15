import { ArrowDownLeft, ArrowUpRight, Clock, RefreshCcw, TrendingUp, Wallet } from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard/StatsCard';
import StatsCardSkeleton from '@/components/dashboard/Skeletons/StatsCardSkeleton';
import { TInstructorEarnings } from '@/types/payment.types';

interface WalletStatsProps {
  earnings?: TInstructorEarnings;
  isLoading: boolean;
}

const WalletStats = ({ earnings, isLoading }: WalletStatsProps) => {
  const stats = [
    {
      icon: TrendingUp,
      label: 'Total Earned',
      value: `৳${earnings?.totalEarned?.toLocaleString() ?? 0}`,
      iconColor: '#34796f',
    },
    {
      icon: Wallet,
      label: 'Available',
      value: `৳${earnings?.available?.toLocaleString() ?? 0}`,
      iconColor: '#3b82f6',
    },
    {
      icon: Clock,
      label: 'Pending Clearance',
      value: `৳${earnings?.pendingWithdrawal?.toLocaleString() ?? 0}`,
      iconColor: '#f59e0b',
    },
    {
      icon: ArrowDownLeft,
      label: 'Holding',
      value: `৳${earnings?.holding?.toLocaleString() ?? 0}`,
      iconColor: '#8b5cf6',
    },
    {
      icon: ArrowUpRight,
      label: 'Total Withdrawn',
      value: `৳${earnings?.withdrawn?.toLocaleString() ?? 0}`,
      iconColor: '#f97316',
    },
    {
      icon: RefreshCcw,
      label: 'Total Refunded',
      value: `৳${earnings?.totalRefunded?.toLocaleString() ?? 0}`,
      iconColor: '#ef4444',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {isLoading
        ? [...Array(6)].map((_, i) => <StatsCardSkeleton key={i} />)
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

export default WalletStats;
