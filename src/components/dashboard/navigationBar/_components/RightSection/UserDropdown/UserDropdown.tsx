'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { logout, useCurrentUser } from '@/redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logoutUser } from '@/services/auth/auth.service';
import { Bell, ChevronDown, LogOut, Settings, User as UserIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UserDropdown() {
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    dispatch(logout());
    router.push('/login');
  };

  const userName = user?.fullName || 'User';
  const userRole = user?.role || 'Guest';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group flex cursor-pointer items-center gap-2.5 rounded-sm border border-slate-200 bg-white px-3 py-2 transition-all outline-none hover:border-emerald-100 hover:bg-emerald-50">
          <Avatar className="h-7 w-7 border-2 border-emerald-100">
            <AvatarImage src={user?.avatar as string} />
            <AvatarFallback className="bg-primary text-xs font-black text-white">
              {userName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="hidden flex-col items-start md:flex">
            <span className="text-text-primary text-sm leading-none font-bold">{userName}</span>
            <span className="text-text-secondary mt-0.5 text-[10px] font-semibold tracking-widest uppercase">
              {userRole}
            </span>
          </div>
          <ChevronDown
            size={14}
            className="hidden text-slate-400 transition-transform group-data-[state=open]:rotate-180 md:block"
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-60 rounded-md border border-slate-100 bg-white p-2 shadow-lg shadow-slate-100"
        align="end"
        sideOffset={8}
      >
        {/* User Info */}
        <DropdownMenuLabel className="px-3 py-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border-2 border-emerald-50">
              <AvatarImage src={user?.avatar as string} />
              <AvatarFallback className="bg-primary text-xs font-black text-white">
                {userName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <p className="text-text-primary truncate text-sm font-bold">{userName}</p>
              <p className="text-text-secondary truncate text-xs">{user?.email || 'No email'}</p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-slate-100" />

        <DropdownMenuGroup className="space-y-0.5 py-1">
          <DropdownMenuItem className="hover:text-primary! flex cursor-pointer items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium text-slate-600 transition-all outline-none hover:bg-emerald-50 focus:bg-emerald-50">
            <UserIcon size={15} className="text-slate-400" />
            Profile Settings
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:text-primary! flex cursor-pointer items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium text-slate-600 transition-all outline-none hover:bg-emerald-50 focus:bg-emerald-50">
            <Bell size={15} className="text-slate-400" />
            Notifications
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:text-primary! flex cursor-pointer items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium text-slate-600 transition-all outline-none hover:bg-emerald-50 focus:bg-emerald-50">
            <Settings size={15} className="text-slate-400" />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-slate-100" />

        <DropdownMenuItem
          onClick={handleLogout}
          className="text-danger hover:text-danger/80! flex cursor-pointer items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-semibold transition-all outline-none hover:bg-red-50 focus:bg-red-50"
        >
          <LogOut size={15} />
          Logout Account
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
