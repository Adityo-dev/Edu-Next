'use client';

import { useGetUsersQuery } from '@/redux/features/admin/userManagement/userManagement.api';
import { TUserListItem } from '@/types/userRole.types';
import { GetRelativeTime } from '@/utils/formatDateTime';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const RecentUsers = () => {
  const { data, isLoading } = useGetUsersQuery({ limit: 4 });
  const recentUsers = data?.data?.users || [];

  return (
    <div className="dashboard-card-container">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent Users</h2>
        <Link
          href="/dashboard/admin/users"
          className="text-primary flex items-center gap-2 text-sm font-semibold hover:underline"
        >
          View All <ArrowRight size={16} />
        </Link>
      </div>
      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex animate-pulse items-center gap-3">
              <div className="h-9 w-9 shrink-0 rounded-full bg-gray-200 dark:bg-gray-800"></div>
              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-800"></div>
                <div className="h-2 w-16 rounded bg-gray-200 dark:bg-gray-800"></div>
              </div>
              <div className="h-2 w-12 shrink-0 rounded bg-gray-200 dark:bg-gray-800"></div>
            </div>
          ))
        ) : recentUsers.length === 0 ? (
          <p className="text-text-secondary text-center text-sm">No recent users found.</p>
        ) : (
          recentUsers.map((user: TUserListItem, i: number) => (
            <div key={i} className="flex items-center gap-3">
              {user?.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.firstName}
                  width={36}
                  height={36}
                  className="border-primary/50 h-9 w-9 rounded-full border-2 object-cover"
                />
              ) : (
                <div className="bg-primary/10 text-primary border-primary/50 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold">
                  {user?.firstName?.[0]?.toUpperCase() ?? '?'}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-text-secondary text-xs capitalize">{user?.role}</p>
              </div>
              <p className="text-text-secondary shrink-0 text-xs">
                {GetRelativeTime(user?.createdAt)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentUsers;
