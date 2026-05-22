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
    <SidebarContent className={`${state === 'expanded' ? 'px-4' : 'ps-4'} no-scrollbar pt-5`}>
      <SidebarMenu className="gap-2.5">
        {menuItems.map((item: any) => {
          const isActive = pathname === item?.url;
          const Icon = item?.icon;

          return (
            <SidebarMenuItem key={item?.title}>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={state === 'collapsed' ? item?.title : undefined}
                className="gap-3.5 px-5 py-6 font-medium transition-all duration-200"
              >
                <Link
                  href={item?.url}
                  onClick={() => isMobile && setOpenMobile(false)}
                  className={`flex items-center gap-3.5 font-medium transition-all duration-300 ${isActive ? 'text-primary! bg-[#1E293B]!' : 'hover:text-primary! text-[#F8FAFC]! hover:bg-[#1E293B]/40!'}`}
                >
                  {Icon && <Icon />}
                  <span className={`${state === 'collapsed' ? 'hidden' : 'block'}`}>
                    {item?.title}
                  </span>
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
