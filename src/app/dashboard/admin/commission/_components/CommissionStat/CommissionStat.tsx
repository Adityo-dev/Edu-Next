'use client';

import { BadgePercent, CircleDollarSign, TrendingUp } from 'lucide-react';
import { useGetCommissionStatsQuery } from '@/redux/features/admin/commission/commission.api';
import StatsCardSkeleton from '@/components/dashboard/Skeletons/StatsCardSkeleton';
import StatsCard from '@/components/dashboard/StatsCard/StatsCard';

const CommissionStat = () => {
  const { data, isLoading, isError } = useGetCommissionStatsQuery();
  const statsData = data?.data;

  const stats = [
    {
      icon: BadgePercent,
      label: 'Current Rate',
      value: isError ? '—' : `${statsData?.currentRate || 0}%`,
      iconColor: '#34796f',
    },
    {
      icon: CircleDollarSign,
      label: 'Commission Earned',
      value: isError ? '—' : `৳${(statsData?.commissionEarned || 0).toLocaleString()}`,
      iconColor: '#8b5cf6',
    },
    {
      icon: TrendingUp,
      label: 'Total Revenue',
      value: isError ? '—' : `৳${(statsData?.totalRevenue || 0).toLocaleString()}`,
      iconColor: '#3b82f6',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {isLoading
        ? [...Array(3)].map((_, i) => <StatsCardSkeleton key={i} />)
        : stats.map((stat, i) => (
            <StatsCard
              key={i}
              label={stat?.label}
              value={stat?.value}
              icon={stat?.icon}
              iconColor={stat?.iconColor}
            />
          ))}
    </div>
  );
};

export default CommissionStat;
