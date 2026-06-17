import { Clock, Star, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Course {
  id: string | number;
  image: string;
  title: string;
  badge?: string | null;
  category: string;
  level: string;
  language: string;
  instructorImage: string;
  instructor: string;
  rating: number;
  enrolled: string | number;
  duration: string;
  lessons?: number;
  price: number;
  certificate?: boolean;
}

interface CourseListCardProps {
  course: Course;
  badgeColors: Record<string, string>;
  levelColors: Record<string, string>;
}

function CourseListCard({ course, badgeColors, levelColors }: CourseListCardProps) {
  return (
    <Link
      href={`/courses/${course.id}`}
      className="group dashboard-card-container flex overflow-hidden transition-all duration-300 hover:border-emerald-100 hover:shadow-md hover:shadow-emerald-100/40"
    >
      <div className="relative w-52 shrink-0 overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {course.badge && (
          <span
            className={`absolute top-3 left-3 rounded-sm px-2.5 py-1 text-xs font-bold ${badgeColors[course.badge]}`}
          >
            {course.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="mb-2 flex flex-wrap gap-2">
            <span className="text-primary rounded-sm bg-emerald-50 px-2.5 py-1 text-xs font-semibold">
              {course.category}
            </span>
            <span
              className={`rounded-sm px-2.5 py-1 text-xs font-semibold ${levelColors[course.level]}`}
            >
              {course.level}
            </span>
            <span className="rounded-sm bg-slate-100 px-2.5 py-1 text-xs text-slate-500">
              {course.language}
            </span>
          </div>

          <h3 className="group-hover:text-primary mb-2 text-lg font-bold transition-colors">
            {course.title}
          </h3>

          <div className="mb-3 flex items-center gap-2">
            <Image
              src={course.instructorImage}
              alt={course.instructor}
              width={20}
              height={20}
              className="rounded-full border border-emerald-100"
            />
            <span className="text-text-secondary text-xs font-medium">{course.instructor}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Star size={11} fill="#ffc107" color="#ffc107" />
              <span className="font-bold text-slate-700">{course.rating}</span>
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1">
              <Users size={11} />
              {course.enrolled} students
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {course.duration}
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="text-primary text-xl font-black">৳{course.price.toLocaleString()}</span>
          {course.certificate && (
            <span className="text-primary rounded-sm bg-emerald-50 px-2.5 py-1 text-xs font-semibold">
              🎓 Certificate
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default CourseListCard;
