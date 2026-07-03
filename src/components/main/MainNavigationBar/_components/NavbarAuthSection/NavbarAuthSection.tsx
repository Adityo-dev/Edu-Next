'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ROLE_DASHBOARD_PATH } from '@/constants/dashboardRoutes';
import { logout, useCurrentUser, useIsAuthenticated } from '@/redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logoutUser } from '@/services/auth/auth.service';
import { LayoutDashboard, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const NavbarAuthSection = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(useCurrentUser);
  const isAuthenticated = useAppSelector(useIsAuthenticated);

  const handleLogout = async () => {
    await logoutUser();
    dispatch(logout());
    router.push('/login');
  };

  if (!isAuthenticated || !user) {
    return (
      <Link
        href="/login"
        className="bg-secondary hover:bg-secondary/80 hidden rounded-sm px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-100 transition-all active:scale-95 md:block"
      >
        Sign In
      </Link>
    );
  }

  const dashboardPath = ROLE_DASHBOARD_PATH[user?.role] ?? '/';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex cursor-pointer items-center justify-center rounded-full border-2 border-slate-200 p-0.5 transition-all outline-none hover:border-emerald-400 hover:bg-emerald-50 active:scale-95">
          <Avatar className="h-9 w-9">
            {/* <AvatarImage src={user?.avatar} alt={user?.fullName} /> */}
            <AvatarFallback className="bg-primary text-sm font-semibold text-white">
              {user?.fullName?.charAt(0).toUpperCase() ?? 'U'}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      {/* Dropdown Content: */}
      <DropdownMenuContent
        className="w-60 rounded-md border border-slate-100 bg-white p-2 shadow-md shadow-slate-100"
        align="end"
        sideOffset={8}
      >
        {/* User Info */}
        <DropdownMenuLabel>
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              {/* <AvatarImage src={user?.avatar} alt={user?.fullName} /> */}
              <AvatarFallback className="bg-primary text-xs font-semibold text-white">
                {user?.fullName?.charAt(0).toUpperCase() ?? 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <p className="truncate text-sm font-semibold">
                {(user?.fullName?.length ?? 0) >= 12 ? user?.firstName : user?.fullName}
                <span className="text-primary text-xs capitalize"> ({user?.role || 'User'})</span>
              </p>

              <p className="text-text-secondary truncate text-xs font-normal">{user?.email}</p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-slate-100" />

        {/* Links */}
        <DropdownMenuGroup className="space-y-0.5">
          <DropdownMenuItem
            asChild
            className="hover:text-primary! flex cursor-pointer items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium text-slate-600 transition-all outline-none hover:bg-emerald-50 focus:bg-emerald-50"
          >
            <Link href={dashboardPath}>
              <LayoutDashboard size={15} className="text-slate-400" />
              Dashboard
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-slate-100" />

        {/* Logout */}
        <DropdownMenuItem
          onClick={handleLogout}
          className="text-danger hover:text-danger! flex cursor-pointer items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-bold transition-all outline-none hover:bg-red-50 focus:bg-red-50"
        >
          <LogOut size={15} />
          Logout Account
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarAuthSection;
