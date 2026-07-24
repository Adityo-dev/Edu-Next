import { ICourseListItem } from '@/types/courseManagement.types';
import { ArrowUpRight, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface TopRatedCourseCardProps {
  course: ICourseListItem;
}

export default function TopRatedCourseCard({ course }: TopRatedCourseCardProps) {
  return (
    <Link href={`/courses/${course?.slug || course?._id}`} className="group cursor-pointer">
      {/* Image Container */}
      <div className="relative mb-3 h-50 w-full overflow-hidden rounded-md transition-all duration-500 ease-in-out group-hover:shadow-sm group-hover:shadow-emerald-100">
        <Image
          src={
            course?.thumbnail ||
            'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1000'
          }
          alt={course?.title || 'Course thumbnail'}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <div className="bg-primary/10 absolute inset-0 flex items-center justify-center opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100">
          <div className="bg-primary translate-y-3 rounded-full p-3 text-white shadow-md transition-transform duration-300 group-hover:translate-y-0">
            <ArrowUpRight size={20} strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* Course Info */}
      <div className="mt-3 px-1">
        {/* Rating + Enrolled */}
        <div className="text-text-secondary mb-2 flex items-center gap-3 text-sm">
          <span className="flex items-center gap-1">
            <Star size={11} fill="#ffc107" color="#ffc107" />
            <span className="font-medium">{course?.rating || 0}</span>
          </span>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span>{course?.enrolledCount || 0} students</span>
        </div>

        {/* Title */}
        <h3 className="group-hover:text-primary mb-2 line-clamp-2 min-h-11 text-base leading-snug font-semibold transition-colors duration-300">
          {course?.title}
        </h3>

        {/* Price */}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-primary text-xl font-black">
            ৳{course?.price?.toLocaleString() || 0}
          </span>
          {course?.estimatedPrice && course.estimatedPrice > course.price && (
            <span className="text-sm font-medium text-slate-400 line-through">
              ৳{course?.estimatedPrice?.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
