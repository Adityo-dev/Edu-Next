import { Skeleton } from '@/components/ui/skeleton';

interface StatsCardSkeletonProps {
  hasSub?: boolean;
  className?: string;
}

const StatsCardSkeleton = ({ hasSub = false, className = '' }: StatsCardSkeletonProps) => {
  return (
    <div className={`dashboard-card-container ${className}`}>
      <Skeleton className="mb-3 h-10 w-10 rounded-sm" />
      <Skeleton className="mb-2 h-5 w-24 sm:h-6" />
      <Skeleton className="mb-1 h-3 w-28 sm:mb-1.5 sm:h-3.5" />
      {hasSub && <Skeleton className="my-0.5 h-2.5 w-32 sm:mb-1 sm:h-3" />}
    </div>
  );
};

export default StatsCardSkeleton;
