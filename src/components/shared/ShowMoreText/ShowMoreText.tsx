'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ShowMoreTextProps {
  children: React.ReactNode;
  maxHeight?: number;
  className?: string;
  gradientColor?: string;
}

export default function ShowMoreText({
  children,
  maxHeight = 300,
  className,
  gradientColor = 'from-white to-transparent',
}: ShowMoreTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight;
      setContentHeight(height);
      if (height > maxHeight) {
        setShowButton(true);
      }
    }

    const handleResize = () => {
      if (contentRef.current) {
        const height = contentRef.current.scrollHeight;
        setContentHeight(height);
        setShowButton(height > maxHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [maxHeight, children]);

  return (
    <div className={cn('relative flex flex-col', className)}>
      <div
        className="relative overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isExpanded ? `${contentHeight}px` : `${maxHeight}px`,
        }}
      >
        <div ref={contentRef}>{children}</div>

        {showButton && !isExpanded && (
          <div
            className={`absolute right-0 bottom-0 left-0 h-24 bg-gradient-to-t ${gradientColor} pointer-events-none`}
          />
        )}
      </div>

      {showButton && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-primary/10 text-primary hover:bg-primary/20 mt-2 flex w-max cursor-pointer items-center gap-1.5 rounded-sm px-4 py-2 text-xs font-bold transition-colors active:scale-95"
        >
          {isExpanded ? (
            <>
              Show Less <ChevronUp size={16} strokeWidth={2.5} />
            </>
          ) : (
            <>
              Show More <ChevronDown size={16} strokeWidth={2.5} />
            </>
          )}
        </button>
      )}
    </div>
  );
}
