'use client';

import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import DynamicActionButton from '../DynamicActionButton/DynamicActionButton';

interface NotFoundProps {
  title?: string;
  description?: string;
  className?: string;
  icon?: LucideIcon;
  actionButton?: React.ReactNode;
  actionText?: string;
  actionHref?: string;
  onActionClick?: () => void;
}

const EmptyState = ({
  title = 'No Adventures Found!',
  description = 'It looks like there are no bookings or plans here yet. Ready to start a new journey?',
  className,
  icon: Icon,
  actionButton,
  actionText,
  actionHref,
  onActionClick,
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
        <div className="from-primary to-primary/30 absolute -inset-1 rounded-full bg-linear-to-r opacity-20 blur"></div>
        <div className="relative flex items-center justify-center rounded-full bg-white p-4 shadow-xs shadow-gray-200/50">
          {Icon && <Icon size={50} strokeWidth={1.5} className="text-primary" />}
        </div>
      </div>

      <div className="max-w-lg space-y-2">
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        <p className="text-secondary text-sm leading-relaxed">{description}</p>
      </div>

      {actionButton && <div className="mt-5">{actionButton}</div>}

      {!actionButton && actionText && (
        <div className="mt-5">
          <DynamicActionButton
            label={actionText}
            href={actionHref}
            onClick={onActionClick}
            variant="default"
          />
        </div>
      )}

      <div className="mt-4 flex gap-1">
        <span className="bg-primary/20 h-1 w-8 rounded-full"></span>
        <span className="bg-primary/40 h-1 w-20 rounded-full"></span>
        <span className="bg-primary/20 h-1 w-8 rounded-full"></span>
      </div>
    </div>
  );
};

export default EmptyState;
