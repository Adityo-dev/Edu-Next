import { Skeleton } from '@/components/ui/skeleton';

const CourseProgressSkeleton = () => {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="dashboard-card-container p-3">
          <div className="flex gap-4">
            <Skeleton className="h-20 w-36 shrink-0" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-5 w-3/4" />
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
