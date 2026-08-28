'use client';

import { useGetMyCoursesQuery } from '@/redux/features/courseManagement/studentCourse.api';
import { Skeleton } from '@/components/ui/skeleton';
import { useMemo } from 'react';

const CourseProgress = () => {
  const { data, isLoading } = useGetMyCoursesQuery({ limit: 3 });
  const courses = useMemo(() => data?.data?.courses || [], [data?.data?.courses]);

  // Calculate overall completion based on fetched courses
  const overallPercentage = useMemo(() => {
    return courses.length > 0
      ? Math.round(
          courses.reduce((acc, curr) => acc + (curr.progress?.percentage || 0), 0) / courses.length,
        )
      : 0;
  }, [courses]);

  return (
    <div className="dashboard-card-container">
      <h2 className="mb-5 text-lg font-bold">Course Progress</h2>

      <div className="space-y-3">
        {isLoading ? (
          <>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="mb-4">
                <div className="mb-1.5 flex items-center justify-between">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-8" />
                </div>
                <Skeleton className="h-1.5 w-full rounded-full" />
                <Skeleton className="mt-1 h-3 w-16" />
              </div>
            ))}
          </>
        ) : courses.length > 0 ? (
          courses.map((enrollment) => (
            <div key={enrollment.enrollmentId}>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="line-clamp-1 text-xs font-medium text-slate-600">
                  {enrollment.course.title}
                </span>
                <span className="text-primary ml-2 shrink-0 text-xs font-bold">
                  {enrollment.progress.percentage}%
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="bg-primary h-full rounded-full"
                  style={{ width: `${enrollment.progress.percentage}%` }}
                />
              </div>
              <div className="mt-1 flex items-center justify-between">
                <p className="text-text-secondary text-[10px]">
                  {enrollment.progress.completedLessonsCount}/{enrollment.course.lessonsCount}{' '}
                  lessons
                </p>
                {/* Optional: Show average quiz score if requested */}
                {enrollment.progress.averageQuizScore !== undefined && (
                  <p className="text-text-secondary text-[10px]">
                    Quiz Avg: {enrollment.progress.averageQuizScore}%
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="py-4 text-center text-xs text-slate-500">No course progress found.</p>
        )}
      </div>

      {/* Overall */}
      <div className="mt-5 rounded-sm bg-emerald-50 p-4 text-center">
        <p className="text-primary text-2xl font-black">
          {isLoading ? '-' : `${overallPercentage}%`}
        </p>
        <p className="text-text-secondary text-xs">Overall Completion</p>
      </div>
    </div>
  );
};

export default CourseProgress;
