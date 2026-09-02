import { Skeleton } from '@/components/ui/skeleton';

interface StatsCardSkeletonProps {
  hasSub?: boolean;
  className?: string;
}

const StatsCardSkeleton = ({ hasSub = false, className = '' }: StatsCardSkeletonProps) => {
  return (
    <div className={`dashboard-card-container ${className}`}>
      <Skeleton className="mb-3 h-10 w-10 rounded-sm" />
      <Skeleton className="mb-1 h-7 w-24 sm:h-8" />
      <Skeleton className={`h-4 w-28 sm:h-5 ${hasSub ? 'mb-1' : ''}`} />
      {hasSub && <Skeleton className="h-3 w-32 sm:h-4" />}
    </div>
  );
};

export default StatsCardSkeleton;
