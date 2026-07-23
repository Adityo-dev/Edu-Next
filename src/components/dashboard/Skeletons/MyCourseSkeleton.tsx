import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const MyCourseSkeleton = () => {
  return (
    <div className="flex items-center gap-4 rounded-sm border border-slate-100 p-4">
      {/* Thumbnail Skeleton */}
      <Skeleton className="h-14 w-20 shrink-0" />

      {/* Content Skeleton */}
      <div className="min-w-0 flex-1 space-y-2">
        {/* Title */}
        <Skeleton className="h-4 w-3/4" />

        {/* Stats Row */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>

      {/* Badge Skeleton */}
      <Skeleton className="h-6 w-16 shrink-0" />
    </div>
  );
};

export default MyCourseSkeleton;
