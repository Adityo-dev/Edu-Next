'use client';

import CustomPagination from '@/components/dashboard/CustomPagination/CustomPagination';
import CustomTable from '@/components/dashboard/CustomTable/CustomTable';
import DynamicTableFilterBar from '@/components/dashboard/DynamicTableFilterBar/DynamicTableFilterBar';
import EmptyState from '@/components/dashboard/EmptyState/EmptyState';
import ErrorState from '@/components/dashboard/ErrorState/ErrorState';
import TableSkeleton from '@/components/dashboard/Skeletons/TableSkeleton';
import { Progress } from '@/components/ui/progress';
import useSetSearchQueryInURL from '@/hooks/useSetSearchQueryInURL';
import {
  useGetInstructorCoursePerformanceQuery,
  useGetInstructorCoursesQuery,
} from '@/redux/features/courseManagement/instructorCourse.api';
import { ICoursePerformance } from '@/types/courseManagement.types';
import { TColumn } from '@/types/custom-table.types';
import { BookOpen, Star } from 'lucide-react';
import Image from 'next/image';
import { useMemo } from 'react';

const CoursePerformanceTable = () => {
  const { getQueryObject } = useSetSearchQueryInURL();
  const queryParams = getQueryObject();

  const currentPage = Number(queryParams.page) || 1;
  const currentLimit = Number(queryParams.limit) || 10;
  const currentSearchUrl = queryParams.search || '';
  const currentCourseUrl = queryParams.course || 'all';

  // Fetch course list for the filter dropdown
  const { data: coursesData } = useGetInstructorCoursesQuery({ limit: 100 });
  const coursesFilterOptions = useMemo(() => {
    const defaultOption = { label: 'All Courses', value: 'all' };
    if (!coursesData?.data?.courses) return [defaultOption];

    const courseOptions = coursesData.data.courses.map((course) => ({
      label: course.title,
      value: course._id,
    }));

    return [defaultOption, ...courseOptions];
  }, [coursesData]);

  const { data, isLoading, isError, refetch } = useGetInstructorCoursePerformanceQuery({
    page: currentPage,
    limit: currentLimit,
    search: currentSearchUrl,
    courseId: currentCourseUrl === 'all' ? undefined : currentCourseUrl,
  });

  const courses = data?.data?.courses || [];
  const pagination = data?.data?.pagination;

  const CoursePerformanceTableConfig: TColumn<ICoursePerformance>[] = [
    {
      header: 'COURSE',
      cell: (row) => (
        <div className="flex items-center gap-3 py-1">
          <div className="relative h-10 w-16 shrink-0 overflow-hidden rounded-sm border border-slate-100">
            <Image
              src={
                row?.thumbnail ||
                'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=600'
              }
              alt={row?.title}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-text-primary line-clamp-2 max-w-xs text-sm font-semibold">
            {row?.title}
          </span>
        </div>
      ),
    },
    {
      header: 'STUDENTS',
      cell: (row) => (
        <span className="font-medium text-slate-700">
          {row?.studentsCount?.toLocaleString() || 0}
        </span>
      ),
    },
    {
      header: 'REVENUE',
      cell: (row) => (
        <span className="text-primary font-bold">৳{row?.revenue?.toLocaleString() || 0}</span>
      ),
    },
    {
      header: 'VIEWS',
      cell: (row) => (
        <span className="text-slate-600">{row?.totalViews?.toLocaleString() || 0}</span>
      ),
    },
    {
      header: 'RATING',
      cell: (row) => (
        <>
          {row?.rating > 0 ? (
            <div className="flex items-center gap-1">
              <Star size={14} fill="#ffc107" color="#ffc107" />
              <span className="font-semibold text-slate-700">{row?.rating?.toFixed(1)}</span>
            </div>
          ) : (
            <span className="text-text-secondary text-xs">No rating</span>
          )}
        </>
      ),
    },
    {
      header: 'COMPLETION',
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Progress value={row?.completionRate || 0} className="h-1.5 w-20" />
          <span className="text-xs font-bold text-slate-700">{row?.completionRate || 0}%</span>
        </div>
      ),
    },
  ];

  return (
    <div className="dashboard-card-container">
      <div className="flex flex-col gap-4 pb-4 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="shrink-0 text-lg font-semibold">Course Performance</h2>
        <div className="w-full lg:w-auto">
          <DynamicTableFilterBar
            fields={[
              {
                type: 'select',
                name: 'course',
                options: coursesFilterOptions,
                placeholder: 'Filter by Course',
              },
              {
                type: 'search',
                name: 'search',
                placeholder: 'Search courses...',
              },
            ]}
          />
        </div>
      </div>

      {isError ? (
        <ErrorState
          title="Failed to load course performance"
          message="We couldn't load the performance stats from the server. Please check your network connection and retry."
          onRetry={refetch}
        />
      ) : isLoading ? (
        <TableSkeleton rows={6} />
      ) : courses.length === 0 ? (
        <EmptyState
          title="No Courses Found"
          icon={BookOpen}
          description="You don't have any course performance stats matching these parameters yet."
        />
      ) : (
        <>
          <CustomTable columns={CoursePerformanceTableConfig} data={courses} />
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

export default CoursePerformanceTable;
