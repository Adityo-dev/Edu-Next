import { Skeleton } from '@/components/ui/skeleton';

const AchievementsSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-sm border border-slate-100 bg-slate-50 p-3">
      {/* Icon Skeleton */}
      <Skeleton className="mb-2 h-8 w-8 rounded-full" />
      {/* Title Skeleton */}
      <Skeleton className="h-3 w-16" />
    </div>
  );
};

export default AchievementsSkeleton;
