import { Skeleton } from '@/components/ui/skeleton';

const AdminBannerSkeleton = () => {
  return (
    <div className="bg-primary dashboard-card-container">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1.5px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      <div className="relative z-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <Skeleton className="mb-2 h-4 w-24 bg-white/20" />
          <Skeleton className="mb-3 h-8 w-48 bg-white/20 md:h-9" />
          <Skeleton className="h-4 w-64 bg-white/20" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-18.5 w-full rounded-sm bg-white/10 sm:w-32.5" />
          <Skeleton className="h-18.5 w-full rounded-sm bg-white/10 sm:w-32.5" />
        </div>
      </div>
    </div>
  );
};

export default AdminBannerSkeleton;
