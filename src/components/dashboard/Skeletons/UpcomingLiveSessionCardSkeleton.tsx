import { Skeleton } from '@/components/ui/skeleton';

const UpcomingLiveSessionCardSkeleton = () => {
  return (
    <div className="dashboard-card-container p-3">
      <div className="flex flex-col gap-3">
        {/* Top Area */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Skeleton className="h-[22px] w-16" />
            <Skeleton className="h-[22px] w-12" />
          </div>

          <Skeleton className="mb-1 h-4 w-3/4 max-w-[280px]" />
          <Skeleton className="h-3 w-1/2 max-w-[200px]" />
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-[18px] w-[18px] rounded-full" />
            <Skeleton className="h-3 w-20" />
          </div>
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-24" />
          </div>
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>

        {/* CTA Area */}
        <div className="mt-1 flex items-center justify-start border-t border-slate-100 pt-3">
          <Skeleton className="h-9 w-full" />
        </div>
      </div>
    </div>
  );
};

export default UpcomingLiveSessionCardSkeleton;
