'use client';

import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface NotFoundProps {
  title?: string;
  description?: string;
  className?: string;
  icon?: LucideIcon;
  actionButton?: React.ReactNode;
}

const EmptyState = ({
  title = 'No Adventures Found!',
  description = 'It looks like there are no bookings or plans here yet. Ready to start a new journey?',
  className,
  icon: Icon,
  actionButton,
}: NotFoundProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-14 text-center',
        'border-primary/10 rounded-md border-2 border-dashed bg-slate-50/50 backdrop-blur-sm',
        'transition-all duration-300',
        className,
      )}
    >
      <div className="relative mb-5">
        <div className="from-primary-100 to-primary-100/30 absolute -inset-1 animate-pulse rounded-full bg-linear-to-r opacity-20 blur"></div>
        <div className="relative flex items-center justify-center rounded-full bg-white p-4 shadow-md shadow-gray-200/50">
          {Icon && <Icon size={56} strokeWidth={1.5} className="text-primary-100" />}
        </div>
      </div>

      <div className="max-w-sm space-y-2">
        <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
        <p className="text-secondary text-sm leading-relaxed">{description}</p>
      </div>

      {actionButton && <div className="mt-6">{actionButton}</div>}

      <div className="mt-4 flex gap-1">
        <span className="bg-primary-100/20 h-1 w-8 rounded-full"></span>
        <span className="bg-primary-100/40 h-1 w-20 rounded-full"></span>
        <span className="bg-primary-100/20 h-1 w-8 rounded-full"></span>
      </div>
    </div>
  );
};

export default EmptyState;
