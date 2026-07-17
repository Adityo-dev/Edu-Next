import { Skeleton } from '@/components/ui/skeleton';

export const RatingOverviewSkeleton = () => {
  return (
    <div className="dashboard-card-container">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        {/* Left: Average Rating Box Skeleton */}
        <div className="bg-primary/10 flex flex-col items-center justify-center rounded-md px-10 py-4 text-center">
          <Skeleton className="h-12 w-20 bg-slate-200" />
          <div className="my-2 flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-4 rounded-sm bg-slate-200" />
            ))}
          </div>
          <Skeleton className="h-5 w-24 bg-slate-200" />
        </div>

        {/* Right: Progress Bars Skeleton */}
        <div className="flex-1 space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-2.5 flex-1 rounded-full bg-slate-200" />
              <div className="flex shrink-0 items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Skeleton key={j} className="h-2.75 w-2.75 rounded-sm bg-slate-200" />
                ))}
              </div>
              <Skeleton className="h-4 w-12 rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
