const CoursePlayerSkeleton = () => {
  return (
    <div className="bg-section-slate flex min-h-[calc(100vh-4rem)] flex-col gap-6 lg:flex-row">
      {/* Left Side: Video & Tabs Skeleton */}
      <div className="flex w-full flex-col overflow-hidden lg:flex-1">
        {/* Video Player Skeleton */}
        <div className="relative aspect-video w-full animate-pulse bg-slate-200 shadow-md dark:bg-slate-800"></div>

        {/* Tabs Skeleton */}
        <div className="bg-pure-white border-subtle mt-4 flex w-full flex-col border-t">
          {/* Navigation Bar */}
          <div className="border-subtle flex items-center justify-between gap-2 border-b px-3 py-4 md:px-6">
            <div className="h-9 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800"></div>
            <div className="h-9 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800"></div>
            <div className="h-9 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800"></div>
          </div>

          {/* Tab Headers */}
          <div className="bg-section-slate px-4 pt-4 md:px-6">
            <div className="border-subtle flex gap-4 border-b sm:gap-6">
              <div className="h-8 w-32 animate-pulse rounded-t-md bg-slate-200 dark:bg-slate-800"></div>
              <div className="h-8 w-24 animate-pulse rounded-t-md bg-slate-200 dark:bg-slate-800"></div>
              <div className="h-8 w-20 animate-pulse rounded-t-md bg-slate-200 dark:bg-slate-800"></div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-pure-white mb-8 space-y-4 p-4 md:p-6">
            <div className="h-8 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800"></div>
            <div className="h-4 w-1/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800"></div>
            <div className="mt-6 space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800"></div>
              <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800"></div>
              <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200 dark:bg-slate-800"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Sidebar Skeleton (Desktop only) */}
      <div className="bg-pure-white border-subtle z-10 hidden w-full shrink-0 flex-col border-l shadow-xs lg:flex lg:h-[calc(100vh-4rem)] lg:w-[420px] xl:w-[450px]">
        {/* Header / Progress */}
        <div className="border-subtle bg-pure-white border-b p-5 pb-4 shadow-sm">
          <div className="mb-4 h-10 w-full animate-pulse rounded-md bg-slate-200 dark:bg-slate-800"></div>
          <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800"></div>
          <div className="mb-2 h-3 w-1/2 animate-pulse rounded bg-slate-200 dark:bg-slate-800"></div>
          <div className="h-2 w-full animate-pulse rounded-full bg-slate-200 dark:bg-slate-800"></div>
        </div>

        {/* Accordions */}
        <div className="flex-1 p-0">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="border-subtle border-b p-5">
              <div className="mb-2 h-5 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800"></div>
              <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursePlayerSkeleton;
