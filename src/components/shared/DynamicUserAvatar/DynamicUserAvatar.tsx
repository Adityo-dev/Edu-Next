'use client';

import { cn } from '@/lib/utils';
import { User } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface DynamicUserAvatarProps {
  src?: string | null;
  alt?: string;
  className?: string;
  size?: number;
}

// Helper function to extract initials from name
const getInitials = (name: string) => {
  if (!name || name === 'User Avatar') return null;
  const parts = name.split(' ').filter(Boolean);
  if (parts.length === 0) return null;
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

export default function DynamicUserAvatar({
  src,
  alt = 'User Avatar',
  className,
  size,
}: DynamicUserAvatarProps) {
  const [hasError, setHasError] = useState(false);
  const [prevSrc, setPrevSrc] = useState(src);

  // Reset error state if the src prop changes
  if (src !== prevSrc) {
    setPrevSrc(src);
    setHasError(false);
  }

  const showFallback = hasError || !src;
  const initials = getInitials(alt);

  // Fallback to 40 for calculations if size is not provided, but don't force inline style
  const computedSize = size || 40;

  return (
    <div
      className={cn(
        'border-primary/50 bg-primary/10 text-primary relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border',
        !size && !className?.includes('h-') && !className?.includes('w-') ? 'h-10 w-10' : '',
        className,
      )}
      style={size ? { width: size, height: size } : undefined}
    >
      {!showFallback ? (
        <Image
          src={src as string}
          alt={alt}
          fill
          sizes={size ? `${size}px` : '100px'}
          className="object-cover"
          onError={() => setHasError(true)}
        />
      ) : initials ? (
        <span
          className="font-semibold select-none"
          style={{ fontSize: Math.max(10, computedSize * 0.4) }}
        >
          {initials}
        </span>
      ) : (
        <User size={Math.max(14, computedSize * 0.5)} />
      )}
    </div>
  );
}
