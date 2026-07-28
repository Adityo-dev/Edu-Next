import { Skeleton } from '@/components/ui/skeleton';

const ContinueLearningSkeleton = () => {
  return (
    <div className="flex items-center gap-4 border border-slate-100 p-4">
      {/* Thumbnail */}
      <div className="relative h-16 w-24 shrink-0 overflow-hidden">
        <Skeleton className="h-full w-full rounded" />
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <Skeleton className="mb-2 h-4 w-3/4" />
        <Skeleton className="mb-2 h-3 w-1/2" />
        <Skeleton className="mb-3 h-3 w-1/3" />

        {/* Progress Bar */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-1.5 flex-1 rounded-full" />
          <Skeleton className="h-3 w-8" />
        </div>
      </div>

      {/* Play Button */}
      <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
    </div>
  );
};

export default ContinueLearningSkeleton;
