'use client';

import { useDebounce } from '@/hooks/useDebounce';
import {
  useGetMyEnrolledCoursesQuery,
  useGetMyStatsQuery,
} from '@/redux/features/courseManagement/studentCourse.api';
import { IEnrolledCourse } from '@/types/courseManagement.types';
import { Filter } from 'lucide-react';
import { useState } from 'react';
import CoursesFilter from '../CoursesFilter/CoursesFilter';
import MyCourseCard from './_components/MyCourseCard/MyCourseCard';

const MyCourse = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [filter, setFilter] = useState<'all' | 'in-progress' | 'completed'>('all');

  // Fetch stats for the filter bar
  const { data: statsData } = useGetMyStatsQuery();
  const totalCourses = statsData?.data?.totalEnrolled || 0;
  const totalInProgress = statsData?.data?.inProgress || 0;
  const totalCompleted = statsData?.data?.completed || 0;

  // Fetch paginated/filtered enrolled courses
  const { data, isLoading } = useGetMyEnrolledCoursesQuery({
    search: debouncedSearch || undefined,
    stats: filter === 'all' ? undefined : filter,
    page: 1,
    limit: 100, // Fetch a large number if pagination UI isn't ready
  });

  const rawData = data?.data as
    | { result?: IEnrolledCourse[]; courses?: IEnrolledCourse[]; data?: IEnrolledCourse[] }
    | IEnrolledCourse[]
    | undefined;
  const enrolledCourses: IEnrolledCourse[] = Array.isArray(rawData)
    ? rawData
    : Array.isArray(rawData?.result)
      ? rawData.result
      : Array.isArray(rawData?.courses)
        ? rawData.courses
        : Array.isArray(rawData?.data)
          ? rawData.data
          : [];

  return (
    <div className="space-y-6">
      <CoursesFilter
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
        totalCourses={totalCourses}
        totalInProgress={totalInProgress}
        totalCompleted={totalCompleted}
      />

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
        </div>
      ) : enrolledCourses.length === 0 ? (
        <div className="dashboard-card-container flex flex-col items-center justify-center py-24 text-center">
          <Filter size={40} className="mb-4 text-slate-300" />
          <h3 className="mb-2 text-lg font-bold text-slate-500">No courses found</h3>
          <p className="text-text-secondary text-sm">Try adjusting your search or filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {enrolledCourses.map((enrolledCourse: IEnrolledCourse) => (
            <MyCourseCard key={enrolledCourse.enrollmentId} enrolledCourse={enrolledCourse} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourse;
