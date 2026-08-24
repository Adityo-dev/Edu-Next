import { Skeleton } from '@/components/ui/skeleton';

interface CategoryCardSkeletonProps {
  isYellowStyle?: boolean;
}

const CategoryCardSkeleton = ({ isYellowStyle = false }: CategoryCardSkeletonProps) => {
  return (
    <div className="flex h-80 w-full flex-col overflow-hidden rounded-md border border-slate-100 bg-white p-5 shadow-sm sm:h-85 sm:p-6 md:h-90">
      {isYellowStyle ? (
        <>
          {/* Top: Title & Description Skeleton */}
          <div className="flex w-full grow flex-col gap-3">
            <Skeleton className="h-7 w-3/4" />
            <div className="mt-1 flex flex-col gap-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>

          {/* Bottom: Icon & Image Skeleton */}
          <div className="mt-4 flex items-end justify-between">
            <Skeleton className="h-10 w-10 shrink-0 rounded-full sm:h-12 sm:w-12" />
            <Skeleton className="h-40 w-40 shrink-0 rounded-tl-[3rem] rounded-tr-md rounded-br-3xl rounded-bl-3xl sm:rounded-tl-[4rem] md:rounded-tl-[5rem]" />
          </div>
        </>
      ) : (
        <>
          {/* Top: Icon & Image Skeleton */}
          <div className="mb-4 flex justify-between">
            <Skeleton className="h-10 w-10 shrink-0 rounded-full sm:h-12 sm:w-12" />
            <Skeleton className="h-40 w-40 shrink-0 rounded-tl-[3rem] rounded-tr-md rounded-br-3xl rounded-bl-3xl sm:rounded-tl-[4rem] md:rounded-tl-[5rem]" />
          </div>

          {/* Bottom: Title & Description Skeleton */}
          <div className="mt-auto flex w-full flex-col gap-3">
            <Skeleton className="h-7 w-3/4" />
            <div className="mt-1 flex flex-col gap-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryCardSkeleton;
