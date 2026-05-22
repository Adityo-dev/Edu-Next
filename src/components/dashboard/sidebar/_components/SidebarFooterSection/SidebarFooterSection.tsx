'use client';

import { SidebarFooter, SidebarMenu, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export default function SidebarFooterSection() {
  const { state } = useSidebar();
  const isExpanded = state === 'expanded';

  return (
    <SidebarFooter className={cn('transition-all duration-300', isExpanded ? 'p-4' : 'p-2')}>
      <SidebarMenu>
        <SidebarMenuItem>
          <footer>
            <p className="text-muted-foreground text-xs">© 2023 EduNext. All rights reserved.</p>
          </footer>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
