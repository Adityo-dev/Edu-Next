import { Skeleton } from '@/components/ui/skeleton';

const RevenueOverviewSkeleton = () => {
  return (
    <div className="flex flex-1 flex-col justify-between">
      <div>
        <header className="flex flex-row items-center justify-between pb-6">
          <div></div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-2.5 w-2.5 rounded-full" />
              <Skeleton className="h-3 w-14" />
            </div>
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-2.5 w-2.5 rounded-full" />
              <Skeleton className="h-3 w-14" />
            </div>
          </div>
        </header>
        <div>
          <Skeleton className="h-80 w-full rounded-md" />
        </div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-5">
        <div className="bg-emerald-50/50 p-4">
          <Skeleton className="mb-2 h-3 w-20" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="bg-amber-50/50 p-4">
          <Skeleton className="mb-2 h-3 w-24" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
    </div>
  );
};

export default RevenueOverviewSkeleton;
