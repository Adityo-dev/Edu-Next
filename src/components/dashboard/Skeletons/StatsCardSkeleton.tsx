import { Skeleton } from '@/components/ui/skeleton';

interface StatsCardSkeletonProps {
  hasSub?: boolean;
}

const StatsCardSkeleton = ({ hasSub = false }: StatsCardSkeletonProps) => {
  return (
    <div className="dashboard-card-container">
      <Skeleton className="mb-3 h-10 w-10" />
      <Skeleton className="mb-1 h-8 w-24" />
      <Skeleton className="mb-2 h-4 w-28" />
      {hasSub && <Skeleton className="h-3 w-32" />}
    </div>
  );
};

export default StatsCardSkeleton;
