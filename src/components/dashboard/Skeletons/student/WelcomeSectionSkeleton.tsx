import { Skeleton } from '@/components/ui/skeleton';

const WelcomeSectionSkeleton = () => {
  return (
    <div className="bg-primary relative overflow-hidden rounded-md px-8 py-8">
      <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/5 blur-3xl" />

      <div className="relative z-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <Skeleton className="mb-2 h-4 w-24 bg-white/20" />
          <Skeleton className="mb-3 h-8 w-48 bg-white/20 md:h-9" />
          <Skeleton className="h-4 w-64 bg-white/20" />
        </div>

        <div className="flex items-center gap-4">
          <Skeleton className="h-20 w-24 rounded-md bg-white/10" />
          <Skeleton className="h-20 w-24 rounded-md bg-white/10" />
        </div>
      </div>
    </div>
  );
};

export default WelcomeSectionSkeleton;
