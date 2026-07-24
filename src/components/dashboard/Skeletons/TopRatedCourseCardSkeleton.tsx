import { Skeleton } from '@/components/ui/skeleton';

export default function TopRatedCourseCardSkeleton() {
  return (
    <div className="group block">
      {/* Image Skeleton */}
      <Skeleton className="mb-3 h-50 w-full rounded-md" />

      {/* Course Info Skeleton */}
      <div className="mt-3 px-1">
        {/* Rating + Enrolled Skeleton */}
        <div className="mb-2 flex items-center gap-3">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-1 w-1 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>

        {/* Title Skeleton */}
        <div className="mb-2 min-h-11 space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </div>

        {/* Price Skeleton */}
        <div className="mt-2 flex items-baseline gap-2">
          <Skeleton className="h-7 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}
