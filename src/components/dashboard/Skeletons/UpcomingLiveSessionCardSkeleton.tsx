import { Skeleton } from '@/components/ui/skeleton';

const UpcomingLiveSessionCardSkeleton = () => {
  return (
    <div className="dashboard-card-container p-3">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Left Side: Content */}
        <div className="flex-1">
          {/* Badges Skeleton */}
          <div className="mb-2 flex items-center gap-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-12" />
          </div>

          {/* Title Skeleton */}
          <Skeleton className="mb-1.5 h-4 w-3/4 max-w-[280px]" />

          {/* Course Name Skeleton */}
          <Skeleton className="mb-3 h-3 w-1/2 max-w-[200px]" />

          {/* Meta details Skeleton (Instructor, Date, Time, Duration) */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-3 w-20" />
            </div>
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-3 w-3" />
              <Skeleton className="h-3 w-28" />
            </div>
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-3 w-3" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        </div>

        {/* Right Side: Actions Skeleton */}
        <div className="flex shrink-0 items-center gap-2">
          {/* Main Action Button */}
          <Skeleton className="h-10! w-full sm:w-[100px]" />
        </div>
      </div>
    </div>
  );
};

export default UpcomingLiveSessionCardSkeleton;
