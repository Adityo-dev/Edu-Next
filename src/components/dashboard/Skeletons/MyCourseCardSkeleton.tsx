import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const MyCourseCardSkeleton = () => {
  return (
    <div className="dashboard-card-container overflow-hidden">
      {/* Image Section Skeleton */}
      <div className="relative block h-44 w-full bg-slate-100">
        <Skeleton className="h-full w-full rounded-none" />

        {/* Status Badge Skeleton */}
        <Skeleton className="absolute top-3 left-3 h-5 w-20 rounded-sm" />

        {/* Progress Overlay Skeleton */}
        <div className="absolute right-0 bottom-0 left-0 p-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-1.5 flex-1 rounded-full" />
            <Skeleton className="h-3 w-6" />
          </div>
        </div>
      </div>

      {/* Content Section Skeleton */}
      <div className="pt-4">
        {/* Category Badge Skeleton */}
        <Skeleton className="mb-3 h-5 w-24 rounded-sm" />

        {/* Title Skeleton */}
        <div className="mb-2 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Instructor Skeleton */}
        <div className="mb-3 flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-3 w-24" />
        </div>

        {/* Stats Row Skeleton */}
        <div className="mb-4 flex items-center gap-3">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-10" />
        </div>

        {/* Divider */}
        <div className="mb-4 h-px bg-slate-100" />

        {/* Last Accessed + CTA Skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-8 w-24 rounded-sm" />
        </div>
      </div>
    </div>
  );
};

export default MyCourseCardSkeleton;
