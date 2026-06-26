'use client';

import { useGetAdminCourseStatsQuery } from '@/redux/features/courseManagement/adminCourse.api';

const CoursesStats = () => {
  const { data, isLoading, isError } = useGetAdminCourseStatsQuery();

  const stats = [
    { label: 'Total Courses', value: data?.data.totalCourses || 0 },
    { label: 'Published', value: data?.data.published || 0 },
    { label: 'Pending', value: data?.data.pending || 0 },
    { label: 'Rejected', value: data?.data.rejected || 0 },
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

export default CoursesStats;
