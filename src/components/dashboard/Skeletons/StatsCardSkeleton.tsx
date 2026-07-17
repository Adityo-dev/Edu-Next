interface StatsCardSkeletonProps {
  hasSub?: boolean;
}

const StatsCardSkeleton = ({ hasSub = false }: StatsCardSkeletonProps) => {
  return (
    <div className="dashboard-card-container">
      <div className="mb-3 h-10 w-10 animate-pulse rounded bg-slate-200"></div>

      <div className="mb-1 h-8 w-24 animate-pulse rounded bg-slate-200"></div>

      <div className="mb-2 h-4 w-28 animate-pulse rounded bg-slate-200"></div>

      {hasSub && <div className="h-3 w-32 animate-pulse rounded bg-slate-200"></div>}
    </div>
  );
};

export default StatsCardSkeleton;
