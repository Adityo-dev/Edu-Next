import { Skeleton } from '@/components/ui/skeleton';

interface StatsCardSkeletonProps {
  hasSub?: boolean;
  className?: string;
}

const StatsCardSkeleton = ({ hasSub = false, className = '' }: StatsCardSkeletonProps) => {
  return (
    <div className={`dashboard-card-container ${className}`}>
      <Skeleton className="mb-3 h-10 w-10 rounded-sm" />
      <Skeleton className="mb-1 h-8 w-24" />
      <Skeleton className={`h-4 w-28 ${hasSub ? 'mb-1.5' : ''}`} />
      {hasSub && <Skeleton className="h-3 w-32" />}
    </div>
  );
};

export default StatsCardSkeleton;
