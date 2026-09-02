'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { roleTypes } from '../sidebar/sidebarRoutes';
import { DynamicBreadcrumb } from './_components/DynamicBreadcrumb/DynamicBreadcrumb';
import RightSection from './_components/RightSection/RightSection';

export default function NavigationBar({ role }: { role: roleTypes }) {
  return (
    <header className="sticky top-0 z-50 flex w-full shrink-0 items-center border-b border-slate-100 bg-white px-4 py-3 lg:px-6">
      <div className="flex w-full items-center justify-between gap-4">
        {/* Left */}
        <div className="flex items-center gap-3">
          <SidebarTrigger className="text-primary hover:text-primary h-9 w-9 cursor-pointer rounded-sm bg-emerald-50 transition-colors hover:bg-emerald-100" />
          <DynamicBreadcrumb />
        </div>

        {/* Right */}
        <RightSection role={role} />
      </div>
    </header>
  );
}
