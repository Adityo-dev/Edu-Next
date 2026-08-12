import { Skeleton } from '@/components/ui/skeleton';

const MotivationalBannerSkeleton = () => {
  return (
    <div className="bg-primary flex flex-col items-center rounded-md p-5 text-center">
      <Skeleton className="mb-3 h-6 w-6 rounded-full bg-white/20" />
      <Skeleton className="mb-2 h-4 w-3/4 bg-white/20" />
      <Skeleton className="h-3 w-1/2 bg-white/20" />
    </div>
  );
};

export default MotivationalBannerSkeleton;
