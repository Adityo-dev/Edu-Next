import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const NotificationSkeleton = () => {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="border-border flex items-start gap-4 rounded-md border bg-white p-3"
        >
          {/* Icon Skeleton */}
          <Skeleton className="mt-0.5 h-8 w-8 shrink-0 rounded-sm" />

          {/* Content Skeleton */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-1/3" />
            </div>
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-2 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationSkeleton;
