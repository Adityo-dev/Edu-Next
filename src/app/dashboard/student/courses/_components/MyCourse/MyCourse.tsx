'use client';

import DynamicTableFilterBar from '@/components/dashboard/DynamicTableFilterBar/DynamicTableFilterBar';
import EmptyState from '@/components/dashboard/EmptyState/EmptyState';
import ErrorState from '@/components/dashboard/ErrorState/ErrorState';
import MyCourseCardSkeleton from '@/components/dashboard/Skeletons/MyCourseCardSkeleton';
import useSetSearchQueryInURL from '@/hooks/useSetSearchQueryInURL';
import {
  useGetMyBasicStatsQuery,
  useGetMyCoursesQuery,
} from '@/redux/features/courseManagement/studentCourse.api';
import { IEnrolledCourse } from '@/types/courseManagement.types';
import { ITableFilter } from '@/types/table-filter.types';
import CustomPagination from '@/components/dashboard/CustomPagination/CustomPagination';
import { BookOpen } from 'lucide-react';
import { useMemo } from 'react';
import MyCourseCard from './_components/MyCourseCard/MyCourseCard';

const MyCourse = () => {
  const { getQueryObject } = useSetSearchQueryInURL();
  const queryParams = getQueryObject();

  const currentStatus = (queryParams.status as 'all' | 'in-progress' | 'completed') || 'all';
  const currentSearchUrl = queryParams.search || '';
  const currentPage = Number(queryParams.page) || 1;

  // Fetch stats for the filter bar
  const { data: statsData } = useGetMyBasicStatsQuery();
  const totalCourses = statsData?.data?.totalEnrolled || 0;
  const totalInProgress = statsData?.data?.inProgress || 0;
  const totalCompleted = statsData?.data?.completed || 0;

  // Fetch paginated/filtered enrolled courses
  const { data, isLoading, isError, refetch } = useGetMyCoursesQuery({
    search: currentSearchUrl || undefined,
    stats: currentStatus === 'all' ? undefined : currentStatus,
    page: currentPage,
    limit: 12,
  });

  const rawData = data?.data as
    | { result?: IEnrolledCourse[]; courses?: IEnrolledCourse[]; data?: IEnrolledCourse[] }
    | IEnrolledCourse[]
    | undefined;

  const enrolledCourses: IEnrolledCourse[] = useMemo(() => {
    return Array.isArray(rawData)
      ? rawData
      : Array.isArray(rawData?.result)
        ? rawData.result
        : Array.isArray(rawData?.courses)
          ? rawData.courses
          : Array.isArray(rawData?.data)
            ? rawData.data
            : [];
  }, [rawData]);

  const CourseFilters: ITableFilter[] = useMemo(
    () => [
      {
        type: 'tabs',
        name: 'status-filter',
        options: [
          { label: `All (${totalCourses})`, value: 'all' },
          { label: `In Progress (${totalInProgress})`, value: 'in-progress' },
          { label: `Completed (${totalCompleted})`, value: 'completed' },
        ],
      },
      {
        type: 'search',
        name: 'search',
        placeholder: 'Search your courses...',
      },
    ],
    [totalCourses, totalInProgress, totalCompleted],
  );

  return (
    <div className="space-y-6">
      <DynamicTableFilterBar fields={CourseFilters} />

      {isError ? (
        <ErrorState
          title="Failed to load your courses"
          message="We couldn't load your enrolled courses from the server. Please check your network connection and retry."
          onRetry={refetch}
        />
      ) : isLoading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <MyCourseCardSkeleton key={i} />
          ))}
        </div>
      ) : enrolledCourses.length === 0 ? (
        <EmptyState
          title="No Courses Found"
          icon={BookOpen}
          description="You haven't enrolled in any courses matching these parameters yet."
        />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {enrolledCourses.map((enrolledCourse: IEnrolledCourse) => (
              <MyCourseCard key={enrolledCourse.enrollmentId} enrolledCourse={enrolledCourse} />
            ))}
          </div>

          {data?.data?.pagination && data.data.pagination.totalPages > 1 && (
            <CustomPagination meta={data.data.pagination} />
          )}
        </>
      )}
    </div>
  );
};

export default MyCourse;
