import { BookOpen, Clock, Play, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { IEnrolledCourse } from '@/types/courseManagement.types';

interface MyCourseCardProps {
  enrolledCourse: IEnrolledCourse;
}

const statusColors: Record<string, string> = {
  'In Progress': 'bg-blue-50 text-blue-600',
  Completed: 'bg-emerald-50 text-primary',
};

const MyCourseCard = ({ enrolledCourse }: MyCourseCardProps) => {
  const { course, progress } = enrolledCourse;

  return (
    <div className="group dashboard-card-container overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-emerald-100 hover:shadow-md hover:shadow-emerald-100/40">
      {/* Image */}
      <Link
        href={`/dashboard/student/courses/${course?._id}`}
        className="relative block h-44 overflow-hidden bg-slate-100"
      >
        <Image
          src={course?.thumbnail || 'https://placehold.co/600x400/EEE/31343C'}
          alt={course?.title || 'Course Thumbnail'}
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Status Badge */}
        <span
          className={`absolute top-3 left-3 rounded-sm px-2.5 py-1 text-xs font-bold shadow-sm ${
            statusColors[progress?.status] || 'bg-slate-100 text-slate-700'
          }`}
        >
          {progress?.status}
        </span>

        {/* Certificate Badge */}
        {progress?.isCourseCompleted && (
          <span className="absolute top-3 right-3 rounded-sm bg-yellow-400 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
            🎓 Certified
          </span>
        )}

        {/* Progress Overlay */}
        <div className="absolute right-0 bottom-0 left-0 bg-linear-to-t from-black/60 to-transparent p-3">
          <div className="flex items-center gap-2">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/30">
              <div
                className={`h-full rounded-full ${
                  progress?.isCourseCompleted ? 'bg-yellow-400' : 'bg-primary'
                }`}
                style={{ width: `${progress?.percentage || 0}%` }}
              />
            </div>
            <span className="text-xs font-bold text-white">{progress?.percentage || 0}%</span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="pt-4">
        {/* Category */}
        <span className="text-primary mb-3 inline-block rounded-sm bg-emerald-50 px-2.5 py-1 text-xs font-semibold">
          {course?.category}
        </span>

        {/* Title */}
        <Link href={`/dashboard/student/courses/${course?._id}`}>
          <h3 className="group-hover:text-primary mb-2 line-clamp-2 text-base leading-snug font-bold transition-colors duration-300">
            {course?.title}
          </h3>
        </Link>

        {/* Instructor */}
        <div className="mb-3 flex items-center gap-2">
          <Image
            src={course?.instructor?.avatar || 'https://placehold.co/150x150/EEE/31343C'}
            alt={`${course?.instructor?.firstName || 'Instructor'} ${course?.instructor?.lastName || ''}`}
            width={20}
            height={20}
            className="rounded-full border border-emerald-100"
          />
          <span className="text-text-secondary text-xs">
            {course?.instructor?.firstName} {course?.instructor?.lastName}
          </span>
        </div>

        {/* Stats Row */}
        <div className="text-text-secondary mb-4 flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1">
            <BookOpen size={11} />
            {progress?.completedLessonsCount}/{course?.lessonsCount} lessons
          </span>
          <span className="text-slate-300">|</span>
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {course?.totalDuration}
          </span>
          <span className="text-slate-300">|</span>
          <span className="flex items-center gap-1">
            <Star size={11} fill="#ffc107" color="#ffc107" />
            {course?.rating}
          </span>
        </div>

        <div className="mb-4 h-px bg-slate-100" />

        {/* Last Accessed + CTA */}
        <div className="flex items-center justify-between">
          <p className="text-text-secondary text-xs">
            {progress?.lastActivityAt
              ? new Date(progress?.lastActivityAt).toLocaleDateString()
              : 'N/A'}
          </p>

          {progress?.isCourseCompleted ? (
            <div className="flex items-center gap-2">
              <button className="text-primary text-xs font-bold hover:underline">
                Download Certificate
              </button>
            </div>
          ) : (
            <Link
              href={`/dashboard/student/courses/${course?._id}`}
              className="bg-primary flex items-center gap-1.5 rounded-sm px-4 py-2 text-xs font-bold text-white transition-all hover:bg-[#2a6159] active:scale-95"
            >
              <Play size={11} fill="white" />
              Continue
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCourseCard;
