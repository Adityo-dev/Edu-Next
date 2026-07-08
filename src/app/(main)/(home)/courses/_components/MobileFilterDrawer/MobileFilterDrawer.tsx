/* eslint-disable no-unused-vars */
import { ReactNode } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';

interface MobileFilterDrawerProps {
  mobileFilterOpen: boolean;
  setMobileFilterOpen: (open: boolean) => void;
  children: ReactNode;
}

export default function MobileFilterDrawer({
  mobileFilterOpen,
  setMobileFilterOpen,
  children,
}: MobileFilterDrawerProps) {
  return (
    <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
      <SheetContent side="right" className="w-[350px] overflow-y-auto bg-white p-4 sm:w-[400px]">
        {children}
      </SheetContent>
    </Sheet>
  );
}
