'use client';

import { useGetMyEnrolledCoursesQuery } from '@/redux/features/courseManagement/studentCourse.api';
import { IEnrolledCourse } from '@/types/courseManagement.types';
import { Filter } from 'lucide-react';
import { useState } from 'react';
import CoursesFilter from '../CoursesFilter/CoursesFilter';
import MyCourseCard from './_components/MyCourseCard/MyCourseCard';

const MyCourse = () => {
  const { data, isLoading } = useGetMyEnrolledCoursesQuery();
  const enrolledCourses = data?.data || [];
  console.log(data);

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'in-progress' | 'completed'>('all');

  const totalCourses = enrolledCourses.length;
  const totalInProgress = enrolledCourses.filter(
    (c: IEnrolledCourse) => c.progress?.status === 'In Progress',
  ).length;
  const totalCompleted = enrolledCourses.filter(
    (c: IEnrolledCourse) => c.progress?.status === 'Completed',
  ).length;

  const filteredCourses = enrolledCourses.filter((c: IEnrolledCourse) => {
    const title = c.course?.title?.toLowerCase() || '';
    const category = c.course?.category?.toLowerCase() || '';
    const searchTerm = search?.toLowerCase() || '';

    const matchSearch = title.includes(searchTerm) || category.includes(searchTerm);

    let matchFilter = true;
    if (filter === 'in-progress') {
      matchFilter = c.progress?.status === 'In Progress';
    } else if (filter === 'completed') {
      matchFilter = c.progress?.status === 'Completed';
    }

    return matchSearch && matchFilter;
  });

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
      ) : filteredCourses.length === 0 ? (
        <div className="dashboard-card-container flex flex-col items-center justify-center py-24 text-center">
          <Filter size={40} className="mb-4 text-slate-300" />
          <h3 className="mb-2 text-lg font-bold text-slate-500">No courses found</h3>
          <p className="text-text-secondary text-sm">Try adjusting your search or filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCourses.map((enrolledCourse: IEnrolledCourse) => (
            <MyCourseCard key={enrolledCourse.enrollmentId} enrolledCourse={enrolledCourse} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourse;
