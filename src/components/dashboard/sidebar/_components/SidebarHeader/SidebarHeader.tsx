'use client';

import { SidebarHeader, useSidebar } from '@/components/ui/sidebar';
import Link from 'next/link';

function SidebarHeaderSection() {
  const { state } = useSidebar();
  const isExpanded = state === 'expanded';

  return (
    <SidebarHeader className="mt-6 flex flex-col items-center gap-6 px-4">
      {/* Logo Section */}
      <Link href={'/'} className="flex items-center justify-center gap-2.5">
        {isExpanded && (
          <h4 className="text-primary font-sans text-2xl font-bold text-nowrap">
            Edu <span className="text-[#D4AF37]">Next</span>
          </h4>
        )}
      </Link>
    </SidebarHeader>
  );
}

export default SidebarHeaderSection;
