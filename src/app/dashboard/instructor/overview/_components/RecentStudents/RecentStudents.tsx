'use client';

import RecentStudentSkeleton from '@/components/dashboard/Skeletons/RecentStudentSkeleton';
import useSetSearchQueryInURL from '@/hooks/useSetSearchQueryInURL';
import { useGetInstructorStudentsQuery } from '@/redux/features/courseManagement/instructorCourse.api';
import { GetRelativeTime } from '@/utils/formatDateTime';
import Image from 'next/image';
import Link from 'next/link';

const RecentStudents = () => {
  const { getQueryObject } = useSetSearchQueryInURL();
  const queryParams = getQueryObject();

  const currentSearchUrl = queryParams.search || '';

  const { data, isLoading } = useGetInstructorStudentsQuery({
    limit: 5,
    search: currentSearchUrl,
  });

  const recentStudents = data?.data?.students || [];

  return (
    <div className="dashboard-card-container">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">New Students</h2>
        <Link
          href="/dashboard/instructor/students"
          className="text-primary text-sm font-medium hover:underline"
        >
          View All →
        </Link>
      </div>
      <div className="space-y-4">
        {isLoading ? (
          [...Array(5)].map((_, i) => <RecentStudentSkeleton key={i} />)
        ) : recentStudents.length > 0 ? (
          recentStudents.map((studentItem, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-emerald-50">
                <Image
                  src={studentItem?.student?.avatar || '/placeholder-user.jpg'}
                  alt={studentItem?.student?.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{studentItem?.student?.name}</p>
                <p className="text-text-secondary truncate text-xs">{studentItem?.course?.title}</p>
              </div>
              <p className="text-text-secondary shrink-0 text-xs">
                {studentItem?.lastActive ? GetRelativeTime(studentItem?.lastActive) : 'Just now'}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No new students found.</p>
        )}
      </div>
    </div>
  );
};

export default RecentStudents;
