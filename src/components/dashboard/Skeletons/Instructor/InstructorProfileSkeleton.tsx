import { Skeleton } from '@/components/ui/skeleton';

const InstructorProfileSkeleton = () => {
  return (
    <div className="space-y-5">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-6 w-24" />
      </div>

      {/* Cover Photo Skeleton */}
      <Skeleton className="h-40 w-full rounded-sm" />

      {/* Avatar & Badge Skeleton */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-18 w-18 shrink-0 rounded-full border-4 border-white shadow-sm" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
        <Skeleton className="h-8 w-32" />
      </div>

      {/* Form Fields Skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* First Name & Last Name */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-11 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-11 w-full" />
        </div>

        {/* Full Width Fields (Phone, Email, Expertise, Experience, Bio) */}
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2 sm:col-span-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className={i === 4 ? 'h-24 w-full' : 'h-11 w-full'} />
          </div>
        ))}

        {/* Github & LinkedIn */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-11 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-11 w-full" />
        </div>
      </div>

      {/* Badge Request Block Skeleton */}
      <div className="border-border/50 space-y-3 rounded-sm border bg-slate-50 p-4">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-4 w-64" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>

      {/* Save Button Skeleton */}
      <Skeleton className="h-11 w-40 rounded-sm" />
    </div>
  );
};

export default InstructorProfileSkeleton;
