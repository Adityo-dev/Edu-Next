import { Skeleton } from '@/components/ui/skeleton';

const LeaveReviewSkeleton = () => {
  const skeletonArray = Array.from({ length: 2 });

  return (
    <div className="space-y-4">
      {skeletonArray.map((_, index) => (
        <div key={index} className="dashboard-card-container p-3">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-full items-center gap-4">
              {/* Image Skeleton */}
              <Skeleton className="relative h-12 w-20 shrink-0 rounded-sm" />

              {/* Title & Instructor Skeleton */}
              <div className="w-full flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4 max-w-[250px]" />
                <Skeleton className="h-3 w-1/2 max-w-[150px]" />
              </div>
            </div>
            {/* Button Skeleton */}
            <Skeleton className="h-10 w-full shrink-0 rounded-sm sm:w-[120px]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeaveReviewSkeleton;
