import React from 'react';

const PendingTaskSkeleton = () => {
  return (
    <div className="flex h-14 items-center gap-3 rounded-sm border bg-slate-50 p-4">
      <div className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-slate-200" />
      <div className="h-4 w-[80%] animate-pulse rounded bg-slate-200" />
    </div>
  );
};

export default PendingTaskSkeleton;
