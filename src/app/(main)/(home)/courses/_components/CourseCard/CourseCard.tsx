/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import { Separator } from '@/components/ui/separator';
import { ArrowUpRight, Clock, Star, Trash2, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CourseCardProps {
  course: any;
  viewMode: 'grid' | 'list';
  badgeColors: Record<string, string>;
  levelColors: Record<string, string>;
  onRemove?: (id: string) => void;
}

export default function CourseCard({
  course,
  viewMode,
  badgeColors,
  levelColors,
  onRemove,
}: CourseCardProps) {
  if (viewMode === 'grid') {
    return (
      <Link
        href={`/courses/${course?.id}`}
        className="group dashboard-card-container flex h-full flex-col overflow-hidden rounded-sm p-4! transition-all duration-300 hover:-translate-y-1 hover:border-emerald-100 hover:shadow-sm hover:shadow-emerald-100/40"
      >
        {/* Image */}
        <div className="relative h-50 w-full shrink-0 overflow-hidden rounded-sm">
          <Image
            src={course?.image}
            alt={course?.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {course.badge && (
            <DynamicBadge
              text={course.badge}
              color={badgeColors[course.badge] || '#34796f'}
              className="absolute top-3 left-3 shadow-sm backdrop-blur-md"
            />
          )}
          <div className="bg-primary/10 absolute inset-0 flex items-center justify-center opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100">
            <div className="bg-primary translate-y-3 rounded-full p-3 text-white shadow-md transition-transform duration-300 group-hover:translate-y-0">
              <ArrowUpRight size={20} strokeWidth={2.5} />
            </div>
          </div>

          {/* Remove Button (if onRemove is passed) */}
          {onRemove && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onRemove(course.id);
              }}
              className="hover:text-danger absolute top-3 right-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/90 text-slate-400 shadow-sm backdrop-blur-md transition-all hover:bg-red-50"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>

        {/* Body */}
        {/* Body */}
        <div className="flex flex-1 flex-col pt-4">
          {/* Tags */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <DynamicBadge text={course?.category} color="#34796f" />
            <DynamicBadge text={course?.level} color={levelColors[course?.level] || '#ca8a04'} />
            <DynamicBadge text={course?.language} color="#64748b" />
          </div>

          {/* Title */}
          <h3 className="group-hover:text-primary mb-2 line-clamp-2 min-h-11 text-base leading-snug font-semibold transition-colors duration-300">
            {course?.title}
          </h3>

          {/* Instructor */}
          <div className="mb-3 flex items-center gap-2">
            <Image
              src={course?.instructorImage}
              alt={course?.instructor}
              width={24}
              height={24}
              className="rounded-full border border-emerald-100"
            />
            <p className="text-text-secondary text-xs">
              <span className="font-medium text-slate-600">{course?.instructor}</span>
            </p>
          </div>

          {/* Bottom Section */}
          <div className="mt-auto flex flex-col pt-1">
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
              <span className="text-primary text-xl font-black">
                ৳{course?.price.toLocaleString()}
              </span>
              {course?.certificate && <DynamicBadge text="🎓 Certificate" color="#34796f" />}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // List View
  return (
    <Link
      href={`/courses/${course?.id}`}
      className="group dashboard-card-container flex overflow-hidden transition-all duration-300 hover:border-emerald-100 hover:shadow-md hover:shadow-emerald-100/40"
    >
      <div className="relative w-52 shrink-0 overflow-hidden rounded-l-sm">
        <Image
          src={course?.image}
          alt={course?.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {course.badge && (
          <DynamicBadge
            text={course.badge}
            color={badgeColors[course.badge] || '#34796f'}
            className="absolute top-3 left-3 shadow-sm backdrop-blur-md"
          />
        )}

        {/* Remove Button (if onRemove is passed) */}
        {onRemove && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemove(course.id);
            }}
            className="hover:text-danger absolute top-3 right-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/90 text-slate-400 shadow-sm backdrop-blur-md transition-all hover:bg-red-50"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="mb-2 flex flex-wrap gap-2">
            <DynamicBadge text={course?.category} color="#34796f" />
            <DynamicBadge text={course?.level} color={levelColors[course?.level] || '#ca8a04'} />
            <DynamicBadge text={course?.language} color="#64748b" />
          </div>
          <h3 className="group-hover:text-primary mb-2 text-lg font-bold transition-colors">
            {course?.title}
          </h3>
          <div className="mb-3 flex items-center gap-2">
            <Image
              src={course?.instructorImage}
              alt={course?.instructor}
              width={24}
              height={24}
              className="rounded-full border border-emerald-100"
            />
            <span className="text-text-secondary text-xs font-medium">{course?.instructor}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Star size={11} fill="#ffc107" color="#ffc107" />
              <span className="font-bold text-slate-700">{course?.rating}</span>
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1">
              <Users size={11} />
              {course?.enrolled} students
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {course?.duration}
            </span>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="text-primary text-xl font-black">৳{course?.price.toLocaleString()}</span>
          {course?.certificate && <DynamicBadge text="🎓 Certificate" color="#34796f" />}
        </div>
      </div>
    </Link>
  );
}
