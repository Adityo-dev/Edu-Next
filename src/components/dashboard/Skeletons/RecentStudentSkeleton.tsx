import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const RecentStudentSkeleton = () => {
  return (
    <div className="flex items-center gap-3">
      {/* Avatar Skeleton */}
      <Skeleton className="h-9 w-9 shrink-0 rounded-full" />

      {/* Name and Course Title Skeleton */}
      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-2 w-1/2" />
      </div>

      {/* Time Skeleton */}
      <Skeleton className="h-2 w-12 shrink-0" />
    </div>
  );
};

export default RecentStudentSkeleton;
