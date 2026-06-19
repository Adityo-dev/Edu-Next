'use client';

import { useGetUserStatsQuery } from '@/redux/features/admin/userManagement/userManagement.api';

const UsersStats = () => {
  const { data, isLoading, isError } = useGetUserStatsQuery();

  const stats = [
    { label: 'Total Users', value: data?.data.totalUsers },
    { label: 'Students', value: data?.data.totalStudents },
    { label: 'Instructors', value: data?.data.totalInstructors },
    { label: 'Suspended', value: data?.data.totalSuspended },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map((stat, i) => (
        <div key={i} className="dashboard-card-container text-center">
          {isError ? (
            <p className="text-text-secondary text-2xl font-black">—</p>
          ) : isLoading ? (
            <div className="mx-auto h-8 w-10 animate-pulse rounded bg-slate-100" />
          ) : (
            <p className="text-primary text-3xl font-black">{stat.value ?? 0}</p>
          )}
          <p className="text-text-secondary text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default UsersStats;
