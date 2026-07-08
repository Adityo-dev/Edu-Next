/* eslint-disable @typescript-eslint/no-explicit-any */
import { Skeleton } from '@/components/ui/skeleton';
import { Filter } from 'lucide-react';
import CourseCard from '../CourseCard/CourseCard';

interface CoursesGridProps {
  filtered: any[];
  isLoading: boolean;
  viewMode: 'grid' | 'list';
  clearFilters: () => void;
  badgeColors: Record<string, string>;
  levelColors: Record<string, string>;
}

export default function CoursesGrid({
  filtered,
  isLoading,
  viewMode,
  clearFilters,
  badgeColors,
  levelColors,
}: CoursesGridProps) {
  if (isLoading) {
    if (viewMode === 'list') {
      return (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex overflow-hidden rounded-sm border border-slate-100 bg-white shadow-xs md:h-48"
            >
              <Skeleton className="hidden h-full w-52 shrink-0 rounded-none md:block" />
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <div className="mb-2 flex gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <Skeleton className="mb-2 h-6 w-3/4" />
                  <Skeleton className="mb-4 h-6 w-1/2" />
                  <div className="mb-3 flex items-center gap-2">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-4 w-40" />
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                  <Skeleton className="h-7 w-20" />
                  <Skeleton className="h-6 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-sm border border-slate-100 bg-white shadow-xs"
          >
            <Skeleton className="h-48 w-full rounded-none" />
            <div className="p-4 pt-5">
              <div className="mb-3 flex gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-16" />
              </div>
              <Skeleton className="mb-2 h-5 w-full" />
              <Skeleton className="mb-4 h-5 w-3/4" />
              <div className="mb-3 flex items-center gap-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="mb-4 h-4 w-full" />
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                <Skeleton className="h-7 w-20" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-md border border-slate-100 bg-white py-24 text-center shadow-xs">
        <Filter size={40} className="mb-4 text-slate-300" />
        <h3 className="mb-2 text-lg font-bold text-slate-500">No courses found</h3>
        <p className="text-text-secondary mb-6 text-sm">Try adjusting your filters</p>
        <button
          onClick={clearFilters}
          className="bg-primary rounded-sm px-6 py-2.5 text-sm font-bold text-white"
        >
          Clear Filters
        </button>
      </div>
    );
  }

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            viewMode="grid"
            badgeColors={badgeColors}
            levelColors={levelColors}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filtered.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          viewMode="list"
          badgeColors={badgeColors}
          levelColors={levelColors}
        />
      ))}
    </div>
  );
}
