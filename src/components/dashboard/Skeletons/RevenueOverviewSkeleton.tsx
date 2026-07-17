import { Skeleton } from '@/components/ui/skeleton';

const RevenueOverviewSkeleton = () => {
  return (
    <div className="flex flex-1 flex-col justify-between">
      {/* Chart Skeleton */}
      <div className="h-45 w-full">
        <Skeleton className="h-full w-full" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-5">
        <div className="rounded bg-emerald-50/50 p-4">
          <Skeleton className="mb-2 h-3 w-20" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="rounded bg-amber-50/50 p-4">
          <Skeleton className="mb-2 h-3 w-24" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
    </div>
  );
};

export default RevenueOverviewSkeleton;
