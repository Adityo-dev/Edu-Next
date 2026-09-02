import { Skeleton } from '@/components/ui/skeleton';

const ContinueLearningSkeleton = () => {
  return (
    <div className="flex items-center gap-4 rounded-sm border border-slate-100 p-4">
      {/* Thumbnail */}
      <div className="relative h-20 w-36 shrink-0 overflow-hidden rounded-sm">
        <Skeleton className="h-full w-full" />
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1 py-0.5">
        <div className="mb-0.5 flex h-5 items-center">
          <Skeleton className="h-3.5 w-3/4" />
        </div>
        <div className="mb-1 flex h-4 items-center">
          <Skeleton className="h-2.5 w-1/2" />
        </div>
        <div className="mb-1.5 flex h-4 items-center">
          <Skeleton className="h-2.5 w-1/3" />
        </div>

        {/* Progress Bar */}
        <div className="flex h-4 items-center gap-3">
          <Skeleton className="h-1.5 flex-1 rounded-full" />
          <Skeleton className="h-2.5 w-6" />
        </div>
      </div>
    </div>
  );
};

export default ContinueLearningSkeleton;
