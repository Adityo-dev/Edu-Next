/* eslint-disable @typescript-eslint/no-explicit-any */
import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import { Skeleton } from '@/components/ui/skeleton';
import { Filter } from 'lucide-react';
import CourseCard from '../CourseCard/CourseCard';

interface CoursesGridProps {
  filtered: any[];
  isLoading: boolean;
  clearFilters: () => void;
  badgeColors: Record<string, string>;
  levelColors: Record<string, string>;
}

export default function CoursesGrid({
  filtered,
  isLoading,
  clearFilters,
  badgeColors,
  levelColors,
}: CoursesGridProps) {
  if (isLoading) {
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
      <div className="dashboard-card-container flex flex-col items-center justify-center py-24 shadow-none">
        <Filter size={40} className="mb-4 text-slate-300" />
        <h3 className="mb-0.5 text-lg font-semibold">No courses found</h3>
        <p className="text-text-secondary mb-4 text-sm">Try adjusting your filters</p>
        <DynamicActionButton label="Clear Filters" onClick={clearFilters} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {filtered.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          badgeColors={badgeColors}
          levelColors={levelColors}
        />
      ))}
    </div>
  );
}
