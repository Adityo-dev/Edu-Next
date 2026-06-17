import { Separator } from '@/components/ui/separator';
import { ArrowUpRight, Clock, Star, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Course Type
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

// Course Grid Props
interface CourseGridCardProps {
  course: Course;
  badgeColors: Record<string, string>;
  levelColors: Record<string, string>;
}

function CourseGridCard({ course, badgeColors, levelColors }: CourseGridCardProps) {
  return (
    <Link
      href={`/courses/${course?.id}`}
      className="group dashboard-card-container overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-emerald-100 hover:shadow-lg hover:shadow-emerald-100/40"
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={course?.image}
          alt={course?.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {course?.badge && (
          <span
            className={`absolute top-3 left-3 rounded-sm px-2.5 py-1 text-xs font-semibold shadow-sm ${badgeColors[course?.badge]}`}
          >
            {course?.badge}
          </span>
        )}
        <div className="bg-primary/10 absolute inset-0 flex items-center justify-center opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100">
          <div className="bg-primary translate-y-3 rounded-full p-3 text-white shadow-md transition-transform duration-300 group-hover:translate-y-0">
            <ArrowUpRight size={20} strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="pt-5">
        {/* Tags */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="text-primary rounded-sm bg-emerald-50 px-2.5 py-1 text-xs font-semibold">
            {course?.category}
          </span>
          <span
            className={`rounded-sm px-2.5 py-1 text-xs font-semibold ${levelColors[course?.level]}`}
          >
            {course?.level}
          </span>
          <span className="rounded-sm bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
            {course?.language}
          </span>
        </div>

        {/* Title */}
        <h3 className="group-hover:text-primary mb-2 line-clamp-2 text-base leading-snug font-bold transition-colors duration-300">
          {course?.title}
        </h3>

        {/* Instructor */}
        <div className="mb-3 flex items-center gap-2">
          <Image
            src={course?.instructorImage}
            alt={course?.instructor}
            width={22}
            height={22}
            className="rounded-full border border-emerald-100"
          />
          <p className="text-text-secondary text-xs">
            <span className="font-medium text-slate-600">{course?.instructor}</span>
          </p>
        </div>

        {/* Stats Row */}
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Star size={11} fill="#ffc107" color="#ffc107" />
            <span className="font-bold text-slate-700">{course?.rating}</span>
          </span>
          <span className="text-slate-300">|</span>
          <span className="flex items-center gap-1">
            <Users size={11} /> {course?.enrolled} students
          </span>
          <span className="text-slate-300">|</span>
          <span className="flex items-center gap-1">
            <Clock size={11} /> {course?.duration}
          </span>
        </div>

        <Separator className="mb-4" />

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-primary text-xl font-black">৳{course?.price.toLocaleString()}</span>
          {course?.certificate && (
            <span className="text-primary rounded-sm bg-emerald-50 px-2.5 py-1 text-xs font-semibold">
              🎓 Certificate
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default CourseGridCard;
