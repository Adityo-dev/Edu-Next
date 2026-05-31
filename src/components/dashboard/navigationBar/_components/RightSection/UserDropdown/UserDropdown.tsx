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
import { Bell, ChevronDown, LogOut, Settings, User } from 'lucide-react';

const user = {
  name: 'Sumaiya Akter',
  email: 'sumaiya@edunext.com.bd',
  role: 'Super Admin',
  image: 'https://i.pravatar.cc/150?u=sumaiya',
};

export default function UserDropdown() {
  const handleLogout = () => {};

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group flex cursor-pointer items-center gap-2.5 rounded-sm border border-slate-200 bg-white px-3 py-2 transition-all outline-none hover:border-emerald-100 hover:bg-emerald-50">
          <Avatar className="h-7 w-7 border-2 border-emerald-100">
            <AvatarImage src={user.image} />
            <AvatarFallback className="bg-primary text-xs font-black text-white">
              {user.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="hidden flex-col items-start md:flex">
            <span className="text-text-primary text-sm leading-none font-bold">{user.name}</span>
            <span className="text-text-secondary mt-0.5 text-[10px] font-semibold tracking-widest uppercase">
              {user.role}
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
              <AvatarImage src={user.image} />
              <AvatarFallback className="bg-primary text-xs font-black text-white">
                {user.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-text-primary text-sm font-bold">{user.name}</p>
              <p className="text-text-secondary text-xs">{user.email}</p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-slate-100" />

        <DropdownMenuGroup className="space-y-0.5 py-1">
          <DropdownMenuItem className="hover:text-primary! flex cursor-pointer items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium text-slate-600 transition-all outline-none hover:bg-emerald-50 focus:bg-emerald-50">
            <User size={15} className="text-slate-400" />
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
          className="flex cursor-pointer items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-bold text-red-500 transition-all outline-none hover:bg-red-50 focus:bg-red-50"
        >
          <LogOut size={15} />
          Logout Account
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
