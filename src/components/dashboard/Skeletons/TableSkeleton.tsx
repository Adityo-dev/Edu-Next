'use client';

import { cn } from '@/lib/utils';

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  className?: string;
}

const TableSkeleton = ({ rows = 10, columns = 6, className }: TableSkeletonProps) => {
  return (
    <div className={cn('w-full animate-pulse space-y-4', className)}>
      {/* Table Header Skeleton */}
      <div className="flex items-center gap-4 rounded-sm border border-gray-200/80 bg-gray-50 p-4">
        {[...Array(columns)].map((_, i) => (
          <div key={`head-${i}`} className="h-4 flex-1 rounded bg-gray-200" />
        ))}
      </div>

      {/* Table Body Rows Skeleton */}
      <div className="space-y-3">
        {[...Array(rows)].map((_, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className="flex items-center gap-4 rounded-sm border border-gray-100 bg-white p-4"
          >
            {[...Array(columns)].map((_, colIndex) => (
              <div
                key={`col-${rowIndex}-${colIndex}`}
                className={cn(
                  'h-4 rounded bg-gray-200/80',
                  colIndex === 0 ? 'flex-[1.5]' : 'flex-1',
                )}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="mt-4 flex items-center justify-between px-2 py-4">
        <div className="h-4 w-32 rounded bg-gray-200/80" />
        <div className="flex gap-2">
          <div className="h-8 w-16 rounded bg-gray-200/80" />
          <div className="h-8 w-16 rounded bg-gray-200/80" />
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;
