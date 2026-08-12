import { Skeleton } from '@/components/ui/skeleton';

const InstructorWelcomeSkeleton = () => {
  return (
    <div className="bg-primary dashboard-card-container relative overflow-hidden sm:px-6 sm:py-6">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1.5px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/5 blur-3xl" />

      <div className="relative z-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <Skeleton className="mb-1 h-5 w-32 bg-white/20" />
          <Skeleton className="mb-2 h-8 w-64 bg-white/20 md:h-9" />
          <Skeleton className="h-5 w-80 bg-white/20" />
        </div>

        <div className="flex gap-4">
          <div className="flex w-full flex-col items-center justify-center rounded-sm border border-white/10 bg-white/10 px-6 py-2.5 text-center backdrop-blur-sm sm:min-w-[130px]">
            <Skeleton className="mb-1 h-8 w-12 bg-white/20" />
            <Skeleton className="h-4 w-16 bg-white/20" />
          </div>
          <div className="flex w-full flex-col items-center justify-center rounded-sm border border-white/10 bg-white/10 px-6 py-2.5 text-center backdrop-blur-sm sm:min-w-[130px]">
            <Skeleton className="mb-1 h-8 w-12 bg-white/20" />
            <Skeleton className="h-4 w-16 bg-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorWelcomeSkeleton;
