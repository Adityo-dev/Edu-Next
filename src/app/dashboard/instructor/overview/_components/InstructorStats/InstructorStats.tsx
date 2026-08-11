'use client';

import { BookOpen, CircleDollarSign, Users, Wallet } from 'lucide-react';
import { useGetInstructorOverviewStatusQuery } from '@/redux/features/overview/instructorOverview.api';
import StatsCardSkeleton from '@/components/dashboard/Skeletons/StatsCardSkeleton';

const InstructorStats = () => {
  const { data, isLoading } = useGetInstructorOverviewStatusQuery();
  const overviewStatus = data?.data;

  const stats = [
    {
      icon: <BookOpen size={20} />,
      label: 'Total Courses',
      value: overviewStatus?.courses?.total?.toLocaleString() || '0',
      sub: `+${overviewStatus?.courses?.thisMonth || 0} this month`,
    },
    {
      icon: <Users size={20} />,
      label: 'Total Students',
      value: overviewStatus?.students?.total?.toLocaleString() || '0',
      sub: `+${overviewStatus?.students?.thisWeek || 0} this week`,
    },
    {
      icon: <CircleDollarSign size={20} />,
      label: 'Total Revenue',
      value: `৳${(overviewStatus?.revenue?.total || 0).toLocaleString()}`,
      sub: `+৳${(overviewStatus?.revenue?.thisMonth || 0).toLocaleString()} this month`,
    },
    {
      icon: <Wallet size={20} />,
      label: 'Wallet Balance',
      value: `৳${(overviewStatus?.walletBalance || 0).toLocaleString()}`,
      sub: 'Available to withdraw',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {isLoading ? (
        <>
          {[...Array(4)].map((_, i) => (
            <StatsCardSkeleton key={i} />
          ))}
        </>
      ) : (
        stats.map((stat, i) => (
          <div
            key={i}
            className="dashboard-card-container transition-all hover:border-emerald-100 hover:shadow-sm"
          >
            <div className="text-primary mb-3 inline-flex h-10 w-10 items-center justify-center rounded-sm bg-emerald-50">
              {stat.icon}
            </div>
            <p className="text-2xl font-black">{stat.value}</p>
            <p className="text-text-secondary text-sm font-semibold">{stat.label}</p>
            <p className="text-text-secondary mt-0.5 text-xs">{stat.sub}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default InstructorStats;
