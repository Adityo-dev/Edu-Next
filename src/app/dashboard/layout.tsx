/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import NavigationBar from '@/components/dashboard/navigationBar/NavigationBar';
import { AppSidebar } from '@/components/dashboard/sidebar/AppSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const userRole = (pathname.split('/')[2] as any) || 'admin';

  return (
    <SidebarProvider>
      <AppSidebar role={userRole} />
      <SidebarInset>
        <NavigationBar role={userRole} />
        <main className="bg-section-slate text-text-primary h-full w-full overflow-hidden p-4">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
export default DashboardLayout;
