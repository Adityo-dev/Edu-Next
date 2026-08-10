'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { VisuallyHidden } from 'radix-ui';
import React from 'react';

interface DynamicDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

const DynamicDrawer: React.FC<DynamicDrawerProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  className = '',
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className={`flex w-full flex-col p-4 sm:max-w-xl ${className}`}>
        {!title && (
          <VisuallyHidden.Root>
            <SheetTitle>Drawer Dialog</SheetTitle>
          </VisuallyHidden.Root>
        )}

        {(title || description) && (
          <SheetHeader className="mb-4 p-0 text-left">
            {title && (
              <SheetTitle className="text-left text-xl font-semibold tracking-tight">
                {title}
              </SheetTitle>
            )}
            {description && (
              <SheetDescription className="text-text-secondary text-left text-sm leading-relaxed">
                {description}
              </SheetDescription>
            )}
          </SheetHeader>
        )}

        {/* Content Section */}
        <div className="custom-scrollbar w-full flex-1 overflow-y-auto">{children}</div>
      </SheetContent>
    </Sheet>
  );
};

export default DynamicDrawer;
