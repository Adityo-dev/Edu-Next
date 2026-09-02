import { IEnrolledCourse } from '@/types/courseManagement.types';
import Image from 'next/image';
import Link from 'next/link';

interface ContinueLearningCardProps {
  enrolled: IEnrolledCourse;
}

const ContinueLearningCard = ({ enrolled }: ContinueLearningCardProps) => {
  return (
    <Link
      href={`/dashboard/student/courses/${enrolled.course?._id}`}
      className="group flex items-center gap-4 rounded-sm border border-slate-100 p-4 transition-all duration-300 hover:border-emerald-100 hover:shadow-sm"
    >
      {/* Thumbnail */}
      <div className="relative h-20 w-36 shrink-0 overflow-hidden rounded-sm">
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
      <div className="min-w-0 flex-1 py-0.5">
        <h4 className="group-hover:text-primary mb-0.5 truncate text-sm font-semibold transition-colors">
          {enrolled.course?.title}
        </h4>
        <p className="text-text-secondary mb-1 text-xs">
          {enrolled.course?.instructor?.fullName || 'Unknown Instructor'}
        </p>
        <p className="text-text-secondary mb-1.5 truncate text-[11px]">
          Progress:{' '}
          <span className="font-medium text-slate-600">
            {enrolled.progress?.completedLessonsCount || 0}/{enrolled.course?.lessonsCount || 0}{' '}
            Lessons
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
    </Link>
  );
};

export default ContinueLearningCard;
