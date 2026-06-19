'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2, LucideIcon, Plus } from 'lucide-react';
import Link from 'next/link';

interface DynamicButtonProps {
  type?: 'submit' | 'button';
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'outline' | 'danger' | 'secondary';
  disabled?: boolean;
  isLoading?: boolean;
  icon?: LucideIcon | null;
  showIcon?: boolean;
}

const DynamicActionButton = ({
  type = 'button',
  label,
  href,
  onClick,
  className,
  variant = 'default',
  disabled = false,
  isLoading = false,
  icon: Icon = Plus,
  showIcon = false,
}: DynamicButtonProps) => {
  const variantStyles = {
    default: 'bg-primary text-white border-primary hover:bg-primary/90',
    outline: 'bg-transparent border-[#D9D8D8] text-[#2F2F2F] hover:bg-primary/5',
    danger: 'bg-red-500 text-white border-red-600 hover:bg-red-600 ',
    secondary: 'bg-white/80 border-primary hover:border-primary/90 hover:bg-white/90 text-primary',
  };

  const combinedClasses = cn(
    'group relative h-11 text-xs sm:h-12 w-fit cursor-pointer sm:text-base transition-all duration-300 border px-8 active:scale-95 flex items-center justify-center gap-2 font-semibold overflow-hidden rounded-sm',
    variantStyles[variant],
    className,
  );

  const buttonContent = (
    <>
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        showIcon && Icon && <Icon size={18} strokeWidth={2.5} />
      )}
      <span className="relative z-10 text-sm">{label}</span>
    </>
  );

  if (href && !disabled) {
    return (
      <Button asChild className={combinedClasses}>
        <Link href={href} className="flex items-center">
          {buttonContent}
        </Link>
      </Button>
    );
  }

  return (
    <Button
      type={type}
      onClick={onClick}
      className={combinedClasses}
      disabled={disabled || isLoading}
    >
      {buttonContent}
    </Button>
  );
};

export default DynamicActionButton;
