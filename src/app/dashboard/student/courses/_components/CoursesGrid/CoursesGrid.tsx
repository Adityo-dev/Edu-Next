'use client';

import { BookOpen, Clock, Filter, Play, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Course {
  id: number;
  title: string;
  instructor: string;
  instructorImage: string;
  category: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  duration: string;
  rating: number;
  image: string;
  status: string;
  enrolledDate: string;
  lastAccessed: string;
  certificate: boolean;
}

interface CoursesGridProps {
  courses: Course[];
}

const statusColors: Record<string, string> = {
  'in-progress': 'bg-blue-50 text-blue-600',
  completed: 'bg-emerald-50 text-primary',
};

const statusLabels: Record<string, string> = {
  'in-progress': 'In Progress',
  completed: 'Completed',
};

const CoursesGrid = ({ courses }: CoursesGridProps) => {
  if (courses.length === 0) {
    return (
      <div className="dashboard-card-container flex flex-col items-center justify-center py-24 text-center">
        <Filter size={40} className="mb-4 text-slate-300" />
        <h3 className="mb-2 text-lg font-bold text-slate-500">No courses found</h3>
        <p className="text-text-secondary text-sm">Try adjusting your search or filter</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {courses.map((course) => (
        <div
          key={course.id}
          className="group dashboard-card-container overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-emerald-100 hover:shadow-md hover:shadow-emerald-100/40"
        >
          {/* Image */}
          <div className="relative h-44 overflow-hidden">
            <Image
              src={course.image}
              alt={course.title}
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Status Badge */}
            <span
              className={`absolute top-3 left-3 rounded-sm px-2.5 py-1 text-xs font-bold shadow-sm ${statusColors[course.status]}`}
            >
              {statusLabels[course.status]}
            </span>

            {/* Certificate Badge */}
            {course.certificate && (
              <span className="absolute top-3 right-3 rounded-sm bg-yellow-400 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
                🎓 Certified
              </span>
            )}

            {/* Progress Overlay */}
            <div className="absolute right-0 bottom-0 left-0 bg-linear-to-t from-black/60 to-transparent p-3">
              <div className="flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/30">
                  <div
                    className={`h-full rounded-full ${course.status === 'completed' ? 'bg-yellow-400' : 'bg-primary'}`}
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-white">{course.progress}%</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Category */}
            <span className="text-primary mb-3 inline-block rounded-sm bg-emerald-50 px-2.5 py-1 text-xs font-semibold">
              {course.category}
            </span>

            {/* Title */}
            <h3 className="group-hover:text-primary mb-2 line-clamp-2 text-base leading-snug font-bold transition-colors duration-300">
              {course.title}
            </h3>

            {/* Instructor */}
            <div className="mb-3 flex items-center gap-2">
              <Image
                src={course.instructorImage}
                alt={course.instructor}
                width={20}
                height={20}
                className="rounded-full border border-emerald-100"
              />
              <span className="text-text-secondary text-xs">{course.instructor}</span>
            </div>

            {/* Stats Row */}
            <div className="text-text-secondary mb-4 flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1">
                <BookOpen size={11} />
                {course.completedLessons}/{course.totalLessons} lessons
              </span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-1">
                <Clock size={11} />
                {course.duration}
              </span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-1">
                <Star size={11} fill="#ffc107" color="#ffc107" />
                {course.rating}
              </span>
            </div>

            <div className="mb-4 h-px bg-slate-100" />

            {/* Last Accessed + CTA */}
            <div className="flex items-center justify-between">
              <p className="text-text-secondary text-xs">{course.lastAccessed}</p>

              {course.status === 'completed' ? (
                <div className="flex items-center gap-2">
                  <button className="text-primary text-xs font-bold hover:underline">
                    Download Certificate
                  </button>
                </div>
              ) : (
                <Link
                  href={`/courses/${course.id}`}
                  className="bg-primary flex items-center gap-1.5 rounded-sm px-4 py-2 text-xs font-bold text-white transition-all hover:bg-[#2a6159] active:scale-95"
                >
                  <Play size={11} fill="white" />
                  Continue
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoursesGrid;
