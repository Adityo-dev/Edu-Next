import { BookOpen, CheckCircle, Clock, Star } from 'lucide-react';
import Image from 'next/image';
import { useGetMyCoursesQuery } from '@/redux/features/courseManagement/studentCourse.api';
import CourseProgressSkeleton from '@/components/dashboard/Skeletons/student/CourseProgressSkeleton';
import EmptyState from '@/components/dashboard/EmptyState/EmptyState';
import ErrorState from '@/components/dashboard/ErrorState/ErrorState';
import { useMemo } from 'react';
import { FormatDateTime } from '@/utils/formatDateTime';
import { IEnrolledCourse } from '@/types/courseManagement.types';
import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';

const CourseProgressTab = () => {
  const { data, isLoading, isError, isFetching, refetch } = useGetMyCoursesQuery({
    page: 1,
    limit: 12,
  });
  const courses: IEnrolledCourse[] = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawData = data?.data as any;
    let extractedCourses: IEnrolledCourse[] = [];
    if (Array.isArray(rawData)) extractedCourses = rawData;
    else if (Array.isArray(rawData?.result)) extractedCourses = rawData.result;
    else if (Array.isArray(rawData?.courses)) extractedCourses = rawData.courses;
    else if (Array.isArray(rawData?.data)) extractedCourses = rawData.data;

    return [...extractedCourses].sort((a, b) => {
      const aComplete = a.progress?.isCourseCompleted || (a.progress?.percentage || 0) >= 100;
      const bComplete = b.progress?.isCourseCompleted || (b.progress?.percentage || 0) >= 100;
      if (aComplete && !bComplete) return 1;
      if (!aComplete && bComplete) return -1;
      return 0;
    });
  }, [data]);

  return (
    <div className="space-y-4">
      {isError ? (
        <ErrorState
          title="Failed to Load Progress"
          message="We couldn't fetch your course progress right now. Please try again."
          onRetry={refetch}
        />
      ) : isLoading ? (
        <CourseProgressSkeleton />
      ) : courses.length === 0 ? (
        <div className="dashboard-card-container p-6">
          <EmptyState
            title="No Courses Enrolled"
            icon={BookOpen}
            description="You haven't enrolled in any courses yet. Start your learning journey today!"
            actionText="Browse Courses"
            actionHref="/courses"
          />
        </div>
      ) : (
        <div
          className={`space-y-4 transition-opacity duration-300 ${isFetching && !isLoading ? 'pointer-events-none opacity-50' : 'opacity-100'}`}
        >
          {courses.map((enrollment) => {
            const { course, progress } = enrollment;
            const isCompleted = progress.isCourseCompleted;

            return (
              <div
                key={enrollment.enrollmentId}
                className="dashboard-card-container p-3 transition-all hover:border-emerald-100"
              >
                <div className="flex gap-4">
                  {/* Thumbnail */}
                  <div className="relative h-20 w-36 shrink-0 overflow-hidden rounded-sm">
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                    {isCompleted && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <CheckCircle size={24} className="text-warning" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="mb-1 flex items-start justify-between gap-2">
                      <h3 className="line-clamp-1 text-sm font-semibold">{course.title}</h3>
                      <DynamicBadge
                        text={isCompleted ? 'Completed' : 'In Progress'}
                        color={isCompleted ? '#16a34a' : '#3b82f6'}
                      />
                    </div>

                    <p className="text-text-secondary mb-2 text-xs">
                      By {course.instructor.fullName}
                    </p>

                    {/* Progress Bar */}
                    <div className="mb-2 flex items-center gap-3">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="bg-primary h-full rounded-full transition-all"
                          style={{ width: `${progress.percentage}%` }}
                        />
                      </div>
                      <span className="text-primary text-xs font-semibold">
                        {progress.percentage}%
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <BookOpen size={11} />
                        {progress.completedLessonsCount}/{course.lessonsCount} lessons
                      </span>
                      <span className="text-slate-300">|</span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {/* The API currently provides totalDuration but not exact spent hours in this format, mapping total duration for now */}
                        {course.totalDuration}
                      </span>
                      {progress.averageQuizScore !== undefined && (
                        <>
                          <span className="text-slate-300">|</span>
                          <span className="flex items-center gap-1">
                            <Star size={11} fill="#ffc107" color="#ffc107" />
                            Quiz: {progress.averageQuizScore}%
                          </span>
                        </>
                      )}
                      <span className="text-slate-300">|</span>
                      <span>Last active: {FormatDateTime(progress.lastActivityAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CourseProgressTab;
