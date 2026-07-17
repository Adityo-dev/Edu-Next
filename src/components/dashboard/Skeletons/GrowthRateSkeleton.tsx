import { Skeleton } from '@/components/ui/skeleton';

const GrowthRateSkeleton = () => {
  return (
    <div className="dashboard-card-container flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Skeleton className="h-9 w-9 rounded-full" />
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <Skeleton className="h-6 w-14" />
    </div>
  );
};

export default GrowthRateSkeleton;
