/* eslint-disable @typescript-eslint/no-explicit-any */
import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import { Filter } from 'lucide-react';
import CourseCard from '../CourseCard/CourseCard';
import CourseCardSkeleton from '@/components/main/Skeletons/CourseCardSkeleton/CourseCardSkeleton';

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
          <CourseCardSkeleton key={i} />
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
