'use client';

import CustomPagination from '@/components/dashboard/CustomPagination/CustomPagination';
import CustomTable from '@/components/dashboard/CustomTable/CustomTable';
import DynamicTableActions from '@/components/dashboard/DynamicTableActions/DynamicTableActions';
import DynamicTableFilterBar from '@/components/dashboard/DynamicTableFilterBar/DynamicTableFilterBar';
import EmptyState from '@/components/dashboard/EmptyState/EmptyState';
import ErrorState from '@/components/dashboard/ErrorState/ErrorState';
import TableSkeleton from '@/components/dashboard/Skeletons/TableSkeleton';
import useSetSearchQueryInURL from '@/hooks/useSetSearchQueryInURL';
import {
  useGetInstructorCoursesQuery,
  useGetInstructorStudentsQuery,
} from '@/redux/features/courseManagement/instructorCourse.api';
import { IInstructorStudent } from '@/types/courseManagement.types';

import { Progress } from '@/components/ui/progress';
import { TColumn } from '@/types/custom-table.types';
import { ITableFilter } from '@/types/table-filter.types';
import { GetRelativeTime } from '@/utils/formatDateTime';
import { Star, Users } from 'lucide-react';
import Image from 'next/image';
import { useMemo } from 'react';

const InstructorStudentsPage = () => {
  const { getQueryObject } = useSetSearchQueryInURL();
  const queryParams = getQueryObject();

  // 1. Reading URL Query States
  const currentSearchUrl = queryParams.search || '';
  const currentCourse = queryParams.course || 'all';
  const currentPage = Number(queryParams.page) || 1;
  const currentLimit = Number(queryParams.limit) || 10;

  // 2. Fetch courses for the filter options
  const { data: coursesData } = useGetInstructorCoursesQuery({ limit: 100 });
  const courseOptions = useMemo(() => {
    const courses = coursesData?.data?.courses || [];
    return [
      { label: 'All Courses', value: 'all' },
      ...courses.map((c) => ({ label: c.title, value: c._id })),
    ];
  }, [coursesData]);

  // 3. RTK Query Hook for Students
  const { data, isLoading, isError, refetch } = useGetInstructorStudentsQuery({
    page: currentPage,
    limit: currentLimit,
    search: currentSearchUrl,
    courseId: currentCourse === 'all' ? undefined : currentCourse,
  });

  const students = data?.data?.students || [];
  const pagination = data?.data?.pagination;

  // Table column configuration
  const StudentsTableConfig: TColumn<IInstructorStudent>[] = [
    {
      header: 'STUDENT',
      cell: (row) => (
        <div className="flex items-center gap-3 py-1">
          <div className="border-primary relative h-9 w-9 shrink-0 overflow-hidden rounded-full border-2">
            <Image
              src={row?.student?.avatar || 'https://placeholder.com/150'}
              alt={row?.student?.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-text-primary text-sm font-semibold">{row?.student?.name}</span>
            <span className="text-text-secondary text-xs">{row?.student?.email}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'COURSE',
      cell: (row) => <span className="line-clamp-1 max-w-xs">{row?.course?.title}</span>,
    },
    {
      header: 'PROGRESS',
      cell: (row) => {
        const isCompleted = row?.progress === 100;

        return (
          <div className="flex items-center gap-2">
            <Progress
              value={row?.progress}
              className="h-1.5 w-20"
              style={{
                backgroundColor: isCompleted ? '#ffc107' : undefined,
              }}
            />
            <span className="font-semibold">{row?.progress}%</span>
          </div>
        );
      },
    },
    {
      header: 'RATING',
      cell: (row) => (
        <>
          {row?.rating > 0 ? (
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  fill={i < row?.rating ? '#ffc107' : 'none'}
                  color="#ffc107"
                />
              ))}
            </div>
          ) : (
            <span className="text-text-secondary text-xs">No review</span>
          )}
        </>
      ),
    },
    {
      header: 'LAST ACTIVE',
      cell: (row) => {
        if (!row.lastActive) return <span className="text-text-secondary text-xs">N/A</span>;
        return <span>{GetRelativeTime(row.lastActive)}</span>;
      },
    },
    {
      header: 'ACTION',
      cell: (row) => (
        <DynamicTableActions
          actions={[
            {
              type: 'message',
              onClick: () => {
                console.log('Messaging student:', row?.student?._id);
              },
            },
          ]}
        />
      ),
    },
  ];

  // Table filter configuration
  const StudentFilters: ITableFilter[] = [
    {
      type: 'select',
      name: 'course',
      placeholder: 'Course',
      options: courseOptions,
    },
    {
      type: 'search',
      name: 'search',
      placeholder: 'Search students...',
    },
  ];

  return (
    <div className="dashboard-card-container space-y-4 p-3">
      <DynamicTableFilterBar fields={StudentFilters} />

      {isError ? (
        <ErrorState
          title="Failed to load your students"
          message="We couldn't load your enrolled students from the server. Please check your network connection and retry."
          onRetry={refetch}
        />
      ) : isLoading ? (
        <TableSkeleton />
      ) : students.length === 0 ? (
        <EmptyState
          title="No Students Found"
          icon={Users}
          description="You don't have any enrolled students matching these parameters yet."
        />
      ) : (
        <>
          <CustomTable columns={StudentsTableConfig} data={students} />
          {pagination && (
            <CustomPagination
              meta={{
                total: pagination.total,
                page: pagination.page,
                limit: pagination.limit,
                totalPages: pagination.totalPages,
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default InstructorStudentsPage;
