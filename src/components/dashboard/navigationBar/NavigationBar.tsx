'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Search } from 'lucide-react';
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

        {/* Center Search */}
        <div className="mx-4 hidden max-w-lg flex-1 md:block">
          <div className="relative">
            <Search
              size={15}
              className="absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search anything..."
              className="focus:border-primary w-full rounded-sm border border-slate-200 bg-[#F9FAFB] py-2.5 pr-4 pl-10 text-sm text-slate-600 transition-all outline-none placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
            />
          </div>
        </div>

        {/* Right */}
        <RightSection role={role} />
      </div>
    </header>
  );
}
