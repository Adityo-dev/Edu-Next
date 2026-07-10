'use client';

import { SidebarFooter, SidebarMenu, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export default function SidebarFooterSection() {
  const { state } = useSidebar();
  const isExpanded = state === 'expanded';

  return (
    <SidebarFooter
      className={cn(
        'border-t border-white/5 transition-all duration-300',
        isExpanded ? 'px-4 py-4' : 'px-2 py-4',
      )}
    >
      <SidebarMenu>
        <SidebarMenuItem>
          {isExpanded ? (
            <div className="rounded-sm border border-slate-100 bg-slate-50 px-3 py-3">
              <p className="text-xs font-semibold text-slate-500">© 2025 EduNext</p>
              <p className="mt-0.5 text-[10px] text-slate-400">All rights reserved.</p>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="bg-primary flex h-7 w-7 items-center justify-center rounded-sm">
                <span className="text-xs font-black text-white">E</span>
              </div>
            </div>
          )}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
