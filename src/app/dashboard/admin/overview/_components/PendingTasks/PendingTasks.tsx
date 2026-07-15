'use client';

import Link from 'next/link';
import { useGetQuickActionStatsQuery } from '@/redux/features/admin/dashboard/dashboard.api';
import PendingTaskSkeleton from '@/components/dashboard/Skeletons/PendingTaskSkeleton';

const PendingTasks = () => {
  const { data, isLoading } = useGetQuickActionStatsQuery();
  const stats = data?.data;

  const pendingTasks = [
    {
      label: `${stats?.pendingBadgeRequests ?? 0} Badge Requests Pending`,
      url: '/dashboard/admin/instructors',
      color: '#eab308',
    },
    {
      label: `${stats?.pendingWithdrawals ?? 0} Withdrawal Requests Pending`,
      url: '/dashboard/admin/withdrawals',
      color: '#3b82f6',
    },
    {
      label: `${stats?.pendingReviews ?? 0} Reviews Awaiting Moderation`,
      url: '/dashboard/admin/reviews',
      color: '#f97316',
    },
    {
      label: `${stats?.pendingCourses ?? 0} Courses Pending Approval`,
      url: '/dashboard/admin/courses',
      color: '#ef4444',
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <PendingTaskSkeleton key={i} />
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
          className="flex items-center gap-3 rounded-sm border p-4 text-sm font-semibold transition-all hover:shadow-xs"
          style={{
            color: task.color,
            backgroundColor: `${task.color}1A`,
            borderColor: `${task.color}33`,
          }}
        >
          <span className="h-2 w-2 shrink-0 rounded-full bg-current" />
          {task.label}
        </Link>
      ))}
    </div>
  );
};

export default PendingTasks;
