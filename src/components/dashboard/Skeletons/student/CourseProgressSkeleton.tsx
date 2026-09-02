import { Skeleton } from '@/components/ui/skeleton';

const CourseProgressSkeleton = () => {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="dashboard-card-container p-3">
          <div className="grid grid-cols-[112px_1fr] gap-x-3 gap-y-3 sm:grid-cols-[144px_1fr] sm:gap-x-4 sm:gap-y-1">
            <Skeleton className="col-span-1 row-span-1 aspect-video w-full rounded-sm sm:row-span-2" />
            <div className="col-span-1 flex flex-col gap-2 sm:flex-row sm:justify-between sm:pt-0.5">
              <Skeleton className="h-5 w-3/4 sm:w-1/2" />
              <Skeleton className="h-5 w-16" />
            </div>
            <div className="col-span-2 space-y-3 sm:col-span-1 sm:col-start-2">
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-2 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseProgressSkeleton;
