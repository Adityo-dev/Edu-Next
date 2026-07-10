'use client';

import { SidebarHeader, useSidebar } from '@/components/ui/sidebar';
import Link from 'next/link';

function SidebarHeaderSection() {
  const { state } = useSidebar();
  const isExpanded = state === 'expanded';

  return (
    <SidebarHeader className="border-b border-white/5 px-4 py-5">
      <Link href="/" className="flex items-center gap-3">
        {/* Icon — always visible */}
        <div className="bg-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-sm">
          <span className="text-base font-black text-white">E</span>
        </div>

        {/* Text — only when expanded */}
        {isExpanded && (
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-black text-slate-800">
              Edu<span className="text-primary">Next</span>
            </span>
            <span className="text-[10px] font-semibold tracking-[0.15em] text-slate-400 uppercase">
              Dashboard
            </span>
          </div>
        )}
      </Link>
    </SidebarHeader>
  );
}

export default SidebarHeaderSection;
