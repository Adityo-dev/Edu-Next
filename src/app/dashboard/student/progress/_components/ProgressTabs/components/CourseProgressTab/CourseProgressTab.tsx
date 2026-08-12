import { BookOpen, CheckCircle, Clock, Star } from 'lucide-react';
import Image from 'next/image';
import { useGetMyCoursesQuery } from '@/redux/features/courseManagement/studentCourse.api';
import { Skeleton } from '@/components/ui/skeleton';

const CourseProgressTab = () => {
  const { data, isLoading } = useGetMyCoursesQuery({ page: 1, limit: 10 });
  const courses = data?.data?.courses || [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="dashboard-card-container flex gap-4">
            <Skeleton className="h-20 w-28 shrink-0 rounded-sm" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-2 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="dashboard-card-container flex items-center justify-center py-12 text-sm text-slate-500">
        No courses found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {courses.map((enrollment) => {
        const { course, progress } = enrollment;
        const isCompleted = progress.isCourseCompleted;

        return (
          <div
            key={enrollment.enrollmentId}
            className="dashboard-card-container transition-all hover:border-emerald-100"
          >
            <div className="flex gap-4">
              {/* Thumbnail */}
              <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-sm">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
                {isCompleted && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <CheckCircle size={24} className="text-yellow-400" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="mb-1 flex items-start justify-between gap-2">
                  <h3 className="line-clamp-1 text-sm font-bold">{course.title}</h3>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      isCompleted ? 'text-primary bg-emerald-50' : 'bg-blue-50 text-blue-600'
                    }`}
                  >
                    {isCompleted ? 'Completed' : 'In Progress'}
                  </span>
                </div>

                <p className="text-text-secondary mb-3 text-xs">{course.instructor.fullName}</p>

                {/* Progress Bar */}
                <div className="mb-2 flex items-center gap-3">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isCompleted ? 'bg-yellow-400' : 'bg-primary'
                      }`}
                      style={{ width: `${progress.percentage}%` }}
                    />
                  </div>
                  <span
                    className={`text-xs font-black ${
                      isCompleted ? 'text-yellow-500' : 'text-primary'
                    }`}
                  >
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
                  <span>{new Date(progress.lastActivityAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CourseProgressTab;
