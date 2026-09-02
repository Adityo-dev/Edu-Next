import { Skeleton } from '@/components/ui/skeleton';

const OverallProgressSkeleton = () => {
  return (
    <div>
      {/* Big Circle */}
      <div className="mb-5 flex flex-col items-center">
        <div className="relative flex h-32 w-32 items-center justify-center">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#f1f5f9" strokeWidth="12" />
          </svg>
          <div className="absolute flex flex-col items-center text-center">
            <Skeleton className="mb-1 h-7 w-12" />
            <Skeleton className="h-3 w-10" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i}>
            <div className="mb-1 flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-8" />
            </div>
            <Skeleton className="h-1.5 w-full rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverallProgressSkeleton;
