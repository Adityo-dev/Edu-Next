'use client';

import { cn } from '@/lib/utils';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { useState } from 'react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void; // রিকুয়েস্ট রি-ট্রাই বা রিফেচ করার ফাংশন
  className?: string;
}

const ErrorState = ({
  title = 'Failed to load data',
  message = 'Something went wrong while fetching the data. Please try again or contact support if the issue persists.',
  onRetry,
  className,
}: ErrorStateProps) => {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleRetry = () => {
    if (!onRetry) return;

    setIsSpinning(true);
    onRetry();

    setTimeout(() => {
      setIsSpinning(false);
    }, 1000);
  };

  return (
    <div
      className={cn(
        'border-danger/20 bg-danger/3 flex min-h-87.5 w-full flex-col items-center justify-center rounded-md border p-6 text-center shadow-xs backdrop-blur-xs',
        className,
      )}
    >
      <div className="animate-bounce-slow border-danger/20 text-danger bg-danger/8 mb-4 flex h-14 w-14 items-center justify-center rounded-full border">
        <AlertTriangle className="h-6 w-6 stroke-[1.5]" />
      </div>

      <div className="max-w-md space-y-1.5">
        <h3 className="text-text-primary text-lg font-semibold">{title}</h3>
        <p className="text-text-secondary text-sm leading-relaxed">{message}</p>
      </div>

      {onRetry && (
        <button
          onClick={handleRetry}
          className="bg-danger hover:bg-danger/90 mt-6 inline-flex cursor-pointer items-center gap-2 rounded-sm px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-300 focus:outline-none active:scale-95"
        >
          <RefreshCw
            className={cn(
              'h-4 w-4 transition-transform duration-1000',
              isSpinning && 'animate-spin',
            )}
          />
          Retry Loading
        </button>
      )}
    </div>
  );
};

export default ErrorState;
