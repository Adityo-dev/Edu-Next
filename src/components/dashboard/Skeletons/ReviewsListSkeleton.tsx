import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const ReviewsListSkeleton = () => {
  // Creating an array of 3 to show multiple skeleton cards
  const skeletonArray = Array.from({ length: 3 });

  return (
    <div className="mt-8">
      <h2 className="mb-3 text-lg font-semibold">Submitted Reviews</h2>
      <div className="space-y-4">
        {skeletonArray.map((_, index) => (
          <div key={index} className="dashboard-card-container p-3">
            <div className="grid grid-cols-[5rem_1fr] gap-x-4 gap-y-1">
              {/* Image Skeleton */}
              <Skeleton className="relative row-span-1 h-12 w-20 shrink-0 sm:row-span-2" />

              {/* Title & Badge Skeleton */}
              <div className="col-start-2 min-w-0 pt-0.5">
                <div className="mb-1 flex flex-col items-start gap-1 sm:flex-row sm:justify-between sm:gap-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-5 w-20 shrink-0" />
                </div>
              </div>

              {/* Body Content Skeleton */}
              <div className="col-span-2 mt-2 min-w-0 sm:col-span-1 sm:col-start-2 sm:mt-0">
                {/* Stars & Dates Skeleton */}
                <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                  <Skeleton className="h-4 w-24" />
                  <div className="hidden text-slate-300 sm:inline">•</div>
                  <Skeleton className="h-3 w-40" />
                </div>

                {/* Review Text Skeleton */}
                <div className="mb-3 space-y-2">
                  <Skeleton className="h-3.5 w-full" />
                  <Skeleton className="h-3.5 w-[90%]" />
                  <Skeleton className="h-3.5 w-[75%]" />
                </div>

                {/* Edit Button Skeleton */}
                <Skeleton className="h-7 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsListSkeleton;
