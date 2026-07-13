import React from 'react';

const CommissionRateSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Editor Skeleton */}
      <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs">
        <div className="mb-6 h-6 w-1/3 animate-pulse rounded-md bg-slate-100"></div>

        {/* Big Display */}
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 h-28 w-28 animate-pulse rounded-full bg-slate-100"></div>
          <div className="h-4 w-32 animate-pulse rounded-md bg-slate-100"></div>
        </div>

        {/* Slider */}
        <div className="mb-6">
          <div className="mb-2 flex justify-between">
            <div className="h-3 w-6 animate-pulse rounded-md bg-slate-100"></div>
            <div className="h-3 w-6 animate-pulse rounded-md bg-slate-100"></div>
          </div>
          <div className="h-2 w-full animate-pulse rounded-md bg-slate-100"></div>
        </div>

        {/* Quick Select */}
        <div className="mb-6 grid grid-cols-4 gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 animate-pulse rounded-md bg-slate-100"></div>
          ))}
        </div>

        {/* Save Button */}
        <div className="h-[52px] w-full animate-pulse rounded-md bg-slate-100"></div>
      </div>

      {/* Previews Skeleton */}
      <div className="space-y-4">
        {/* Revenue Preview */}
        <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs">
          <div className="mb-5 h-6 w-1/3 animate-pulse rounded-md bg-slate-100"></div>
          <div className="mb-4">
            <div className="mb-1.5 h-3 w-32 animate-pulse rounded-md bg-slate-100"></div>
            <div className="h-11 w-full animate-pulse rounded-md bg-slate-100"></div>
          </div>

          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 w-full animate-pulse rounded-md bg-slate-100"></div>
            ))}
          </div>

          <div className="mt-5 h-3 w-full animate-pulse rounded-full bg-slate-100"></div>
          <div className="mt-2 flex justify-between">
            <div className="h-3 w-20 animate-pulse rounded-md bg-slate-100"></div>
            <div className="h-3 w-20 animate-pulse rounded-md bg-slate-100"></div>
          </div>
        </div>

        {/* Change History */}
        <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs">
          <div className="mb-4 h-6 w-1/3 animate-pulse rounded-md bg-slate-100"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="h-4 w-1/4 animate-pulse rounded-md bg-slate-100"></div>
                <div className="flex flex-col items-end gap-1">
                  <div className="h-3 w-20 animate-pulse rounded-md bg-slate-100"></div>
                  <div className="h-2 w-12 animate-pulse rounded-md bg-slate-100"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommissionRateSkeleton;
