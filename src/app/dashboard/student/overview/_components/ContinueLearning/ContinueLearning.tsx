'use client';

import EmptyState from '@/components/dashboard/EmptyState/EmptyState';
import { useGetMyCoursesQuery } from '@/redux/features/courseManagement/studentCourse.api';
import { IEnrolledCourse } from '@/types/courseManagement.types';
import { BookOpen, Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ContinueLearningSkeleton from '@/components/dashboard/Skeletons/ContinueLearningSkeleton';

const ContinueLearning = () => {
  const { data, isLoading } = useGetMyCoursesQuery({
    stats: 'in-progress',
    page: 1,
    limit: 10,
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

  const displayCourses = enrolledCourses.slice(0, 3);

  return (
    <div className="dashboard-card-container">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Continue Learning</h2>
        <Link
          href="/dashboard/student/courses"
          className="text-primary text-sm font-semibold hover:underline"
        >
          View All →
        </Link>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <ContinueLearningSkeleton key={i} />
            ))}
          </div>
        ) : displayCourses.length > 0 ? (
          displayCourses.map((enrolled) => (
            <div
              key={enrolled.enrollmentId}
              className="group flex items-center gap-4 rounded-sm border border-slate-100 p-4 transition-all duration-300 hover:border-emerald-100 hover:bg-emerald-50/30"
            >
              {/* Thumbnail */}
              <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-sm">
                <Image
                  src={enrolled.course?.thumbnail || 'https://placehold.co/600x400/EEE/31343C'}
                  alt={enrolled.course?.title || 'Course'}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 240px"
                />
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <h4 className="group-hover:text-primary mb-0.5 truncate text-sm font-semibold transition-colors">
                  {enrolled.course?.title}
                </h4>
                <p className="text-text-secondary mb-2 text-xs">
                  {enrolled.course?.instructor?.fullName || 'Unknown Instructor'}
                </p>
                <p className="text-text-secondary mb-2 truncate text-xs">
                  Progress:{' '}
                  <span className="font-medium text-slate-600">
                    {enrolled.progress?.completedLessonsCount || 0}/
                    {enrolled.course?.lessonsCount || 0} Lessons
                  </span>
                </p>

                {/* Progress Bar */}
                <div className="flex items-center gap-3">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="bg-primary h-full rounded-full transition-all"
                      style={{ width: `${Math.min(enrolled.progress?.percentage || 0, 100)}%` }}
                    />
                  </div>
                  <span className="text-primary shrink-0 text-xs font-semibold">
                    {Math.round(enrolled.progress?.percentage || 0)}%
                  </span>
                </div>
              </div>

              {/* Play Button */}
              <Link
                href={`/dashboard/student/courses/${enrolled.course?._id}`}
                className="bg-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100"
              >
                <Play size={14} fill="white" />
              </Link>
            </div>
          ))
        ) : (
          <EmptyState
            title="No Courses in Progress"
            icon={BookOpen}
            description="You don't have any courses currently in progress. Start learning today!"
          />
        )}
      </div>
    </div>
  );
};

export default ContinueLearning;
