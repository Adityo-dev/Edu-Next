'use client';

import Link from 'next/link';
import { useGetQuickActionStatsQuery } from '@/redux/features/admin/dashboard/dashboard.api';

const PendingTasks = () => {
  const { data, isLoading } = useGetQuickActionStatsQuery();
  const stats = data?.data;

  const pendingTasks = [
    {
      label: `${stats?.pendingBadgeRequests ?? 0} Badge Requests Pending`,
      url: '/dashboard/admin/instructors',
      color: 'bg-yellow-50 text-yellow-600 border-yellow-100',
    },
    {
      label: `${stats?.pendingWithdrawals ?? 0} Withdrawal Requests Pending`,
      url: '/dashboard/admin/withdrawals',
      color: 'bg-blue-50 text-blue-600 border-blue-100',
    },
    {
      label: `${stats?.pendingReviews ?? 0} Reviews Awaiting Moderation`,
      url: '/dashboard/admin/reviews',
      color: 'bg-orange-50 text-secondary border-orange-100',
    },
    {
      label: `${stats?.pendingCourses ?? 0} Courses Pending Approval`,
      url: '/dashboard/admin/courses',
      color: 'bg-red-50 text-red-500 border-red-100',
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-14 animate-pulse rounded-sm border bg-slate-50" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {pendingTasks.map((task, i) => (
        <Link
          key={i}
          href={task.url}
          className={`flex items-center gap-3 rounded-sm border p-4 text-sm font-semibold transition-all hover:shadow-xs ${task.color}`}
        >
          <span className="h-2 w-2 shrink-0 rounded-full bg-current" />
          {task.label}
        </Link>
      ))}
    </div>
  );
};

export default PendingTasks;
