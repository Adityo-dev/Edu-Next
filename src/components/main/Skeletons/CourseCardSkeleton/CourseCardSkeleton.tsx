import { Skeleton } from '@/components/ui/skeleton';

export default function CourseCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-sm border border-slate-100 bg-white shadow-xs">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-4 pt-5">
        <div className="mb-3 flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-16" />
        </div>
        <Skeleton className="mb-2 h-5 w-full" />
        <Skeleton className="mb-4 h-5 w-3/4" />
        <div className="mb-3 flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="mb-4 h-4 w-full" />
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
          <Skeleton className="h-7 w-20" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
    </div>
  );
}
