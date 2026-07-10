/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AdminRoutes, InstructorRoutes, roleTypes, StudentRoutes } from '../../sidebarRoutes';

function SidebarContentSection({ role }: { role: roleTypes }) {
  const pathname = usePathname();
  const { setOpenMobile, isMobile, state } = useSidebar();

  const roleBaseRoutes: Record<roleTypes, any[]> = {
    admin: AdminRoutes,
    student: StudentRoutes,
    instructor: InstructorRoutes,
  };

  const menuItems = roleBaseRoutes[role] || [];

  return (
    <SidebarContent className={`no-scrollbar pt-4 ${state === 'expanded' ? 'px-3' : 'px-2'}`}>
      <SidebarMenu className="gap-1">
        {menuItems.map((item: any) => {
          const isActive = pathname === item?.url;
          const Icon = item?.icon;

          return (
            <SidebarMenuItem key={item?.title}>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={state === 'collapsed' ? item?.title : undefined}
                className={`rounded-sm px-3 py-5 font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary! text-white!'
                    : 'hover:text-primary! text-slate-500! hover:bg-slate-100!'
                }`}
              >
                <Link
                  href={item?.url}
                  onClick={() => isMobile && setOpenMobile(false)}
                  className="flex items-center gap-3"
                >
                  {Icon && (
                    <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
                  )}
                  {state !== 'collapsed' && <span className="text-sm">{item?.title}</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarContent>
  );
}

export default SidebarContentSection;
