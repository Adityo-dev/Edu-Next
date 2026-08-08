import { Skeleton } from '@/components/ui/skeleton';

const CategoryCardSkeleton = () => {
  return (
    <div className="dashboard-card-container group flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Grip vertical skeleton */}
          <Skeleton className="h-5 w-5" />

          {/* Icon box skeleton */}
          <Skeleton className="h-10 w-10 shrink-0" />

          {/* Title and subtext skeleton */}
          <div>
            <Skeleton className="mb-1.5 h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </div>

      {/* Subcategory Management Button skeleton */}
      <div className="border-border/50 mt-1.5 flex w-full items-center justify-between rounded-sm border px-3 py-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-6 w-8 rounded-full" />
      </div>

      {/* Footer actions skeleton */}
      <div className="border-border/40 mt-auto flex items-center justify-end gap-2 border-t pt-2">
        <Skeleton className="h-8 w-20 rounded-sm" />
        <Skeleton className="h-8 w-20 rounded-sm" />
        <Skeleton className="h-8 w-20 rounded-sm" />
      </div>
    </div>
  );
};

export default CategoryCardSkeleton;
