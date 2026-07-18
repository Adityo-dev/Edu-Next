import { Skeleton } from '@/components/ui/skeleton';

const CommissionSettingsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Editor Skeleton */}
      <div className="dashboard-card-container h-fit">
        <Skeleton className="mb-6 h-6 w-1/3" />

        {/* Big Display */}
        <div className="mb-8 flex flex-col items-center">
          <Skeleton className="mb-4 h-28 w-28 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Slider */}
        <div className="mb-6">
          <div className="mb-2 flex justify-between">
            <Skeleton className="h-3 w-6" />
            <Skeleton className="h-3 w-6" />
          </div>
          <Skeleton className="h-2 w-full" />
        </div>

        {/* Quick Select */}
        <div className="mb-6 grid grid-cols-4 gap-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>

        {/* Save Button */}
        <Skeleton className="h-13 w-full" />
      </div>

      {/* Previews Skeleton */}
      <div className="space-y-4">
        {/* Revenue Preview */}
        <div className="dashboard-card-container">
          <Skeleton className="mb-5 h-6 w-1/3" />
          <div className="mb-4">
            <Skeleton className="mb-1.5 h-3 w-32" />
            <Skeleton className="h-11 w-full" />
          </div>

          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>

          <Skeleton className="mt-5 h-3 w-full rounded-full" />
          <div className="mt-2 flex justify-between">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>

        {/* Change History */}
        <div className="dashboard-card-container">
          <Skeleton className="mb-4 h-6 w-1/3" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-4 w-1/4" />
                <div className="flex flex-col items-end gap-1">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-2 w-12" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommissionSettingsSkeleton;
