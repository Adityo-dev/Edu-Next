import { Skeleton } from '@/components/ui/skeleton';

const LiveSessionCardSkeleton = () => {
  return (
    <div className="dashboard-card-container">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Left Side: Content */}
        <div className="flex-1">
          {/* Badges Skeleton */}
          <div className="mb-2 flex items-center gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-16" />
          </div>

          {/* Title Skeleton */}
          <Skeleton className="mb-2 h-5 w-2/4" />

          {/* Course Name Skeleton */}
          <Skeleton className="mb-4 h-4 w-1/3" />

          {/* Meta details Skeleton (Date, Time, Students) */}
          <div className="flex flex-wrap items-center gap-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-36" />
          </div>
        </div>

        {/* Right Side: Actions Skeleton */}
        <div className="flex shrink-0 items-center gap-2">
          {/* Main Action Button */}
          <Skeleton className="h-10 w-28" />
          {/* Cancel/End Icon Button */}
          <Skeleton className="h-10 w-10" />
        </div>
      </div>
    </div>
  );
};

export default LiveSessionCardSkeleton;
