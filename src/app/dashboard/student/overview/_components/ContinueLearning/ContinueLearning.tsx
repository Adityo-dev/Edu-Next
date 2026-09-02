'use client';

import EmptyState from '@/components/dashboard/EmptyState/EmptyState';
import ErrorState from '@/components/dashboard/ErrorState/ErrorState';
import ContinueLearningSkeleton from '@/components/dashboard/Skeletons/ContinueLearningSkeleton';
import { useGetMyCoursesQuery } from '@/redux/features/courseManagement/studentCourse.api';
import { IEnrolledCourse } from '@/types/courseManagement.types';
import { BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';
import ContinueLearningCard from './_components/ContinueLearningCard';

const ContinueLearning = () => {
  const { data, isLoading, isFetching, isError, refetch } = useGetMyCoursesQuery({
    page: 1,
    limit: 20,
  });

  const displayCourses = useMemo(() => {
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

    return [...enrolledCourses]
      .sort((a, b) => {
        const aCompleted = (a.progress?.percentage || 0) >= 100 ? 1 : 0;
        const bCompleted = (b.progress?.percentage || 0) >= 100 ? 1 : 0;
        return aCompleted - bCompleted;
      })
      .slice(0, 3);
  }, [data]);

  return (
    <div className="dashboard-card-container">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold">Continue Learning</h2>
        <Link
          href="/dashboard/student/courses"
          className="text-primary flex items-center gap-1 text-sm font-semibold hover:underline"
        >
          View All <ArrowRight size={14} />
        </Link>
      </div>

      <div className="space-y-4">
        {isError ? (
          <ErrorState
            title="Failed to Load Courses"
            message="We couldn't fetch your in-progress courses right now. Please try again."
            onRetry={refetch}
          />
        ) : isLoading ? (
          <div className="flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <ContinueLearningSkeleton key={i} />
            ))}
          </div>
        ) : displayCourses.length === 0 ? (
          <EmptyState
            title="Start Your Learning Journey"
            icon={BookOpen}
            description="You don't have any courses currently in progress. Enroll in a course today to build new skills and track your progress right here on your dashboard!"
            actionText="Explore Courses"
            actionHref="/courses"
          />
        ) : (
          <div
            className={`space-y-4 transition-opacity duration-300 ${isFetching && !isLoading ? 'pointer-events-none opacity-50' : 'opacity-100'}`}
          >
            {displayCourses.map((enrolled) => (
              <ContinueLearningCard key={enrolled.enrollmentId} enrolled={enrolled} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContinueLearning;
