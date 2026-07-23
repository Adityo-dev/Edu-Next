import React from 'react';

const RecentStudentSkeleton = () => {
  return (
    <div className="flex items-center gap-3">
      {/* Avatar Skeleton */}
      <div className="relative h-9 w-9 shrink-0 animate-pulse overflow-hidden rounded-full border-2 border-slate-100 bg-slate-200" />

      {/* Name and Course Title Skeleton */}
      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-3 w-3/4 animate-pulse rounded bg-slate-200" />
        <div className="h-2 w-1/2 animate-pulse rounded bg-slate-200" />
      </div>

      {/* Time Skeleton */}
      <div className="h-2 w-12 shrink-0 animate-pulse rounded bg-slate-200" />
    </div>
  );
};

export default RecentStudentSkeleton;
