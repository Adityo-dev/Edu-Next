'use client';

import { BadgePercent, BookOpen, CircleDollarSign, Users } from 'lucide-react';
import { useGetOverviewStatsQuery } from '@/redux/features/admin/dashboard/dashboard.api';

const AdminStats = () => {
  const { data, isLoading } = useGetOverviewStatsQuery();
  const statsData = data?.data;

  const stats = [
    {
      icon: <Users size={20} />,
      label: 'Total Users',
      value: statsData?.totalUsers?.toLocaleString() ?? 0,
      sub: `+${statsData?.newUsersThisMonth?.toLocaleString() ?? 0} this month`,
    },
    {
      icon: <BookOpen size={20} />,
      label: 'Total Courses',
      value: statsData?.totalCourses?.toLocaleString() ?? 0,
      sub: `+${statsData?.newCoursesThisMonth?.toLocaleString() ?? 0} this month`,
    },
    {
      icon: <CircleDollarSign size={20} />,
      label: 'Total Revenue',
      value: `৳${statsData?.totalRevenue?.toLocaleString() ?? 0}`,
      sub: `+৳${statsData?.newRevenueThisMonth?.toLocaleString() ?? 0} this month`,
    },
    {
      icon: <BadgePercent size={20} />,
      label: 'Commission Earned',
      value: `৳${statsData?.totalCommission?.toLocaleString() ?? 0}`,
      sub: 'Total commission',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="dashboard-card-container transition-all hover:border-emerald-100 hover:shadow-sm"
        >
          <div className="text-primary mb-3 inline-flex h-10 w-10 items-center justify-center rounded-sm bg-emerald-50">
            {stat.icon}
          </div>
          {isLoading ? (
            <div className="mb-1 h-8 w-24 animate-pulse rounded-md bg-slate-200"></div>
          ) : (
            <p className="text-2xl font-black text-[#0f172a]">{stat.value}</p>
          )}
          <p className="text-sm font-semibold text-slate-600">{stat.label}</p>
          {isLoading ? (
            <div className="mt-1 h-4 w-20 animate-pulse rounded bg-slate-200"></div>
          ) : (
            <p className="text-text-secondary mt-0.5 text-xs">{stat.sub}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminStats;
