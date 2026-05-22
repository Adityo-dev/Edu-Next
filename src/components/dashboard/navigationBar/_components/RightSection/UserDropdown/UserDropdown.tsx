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
import { Bell, ChevronDown, LogOut, User } from 'lucide-react';

// Mock User Data
const user = {
  name: 'Rk',
  email: 'trategy@agentarum.com',
  role: 'Super Admin',
};

export default function UserDropdown() {
  const handleLogout = () => {};

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group flex cursor-pointer items-center gap-3 rounded-md border-white/5 outline-0! transition-all duration-300 hover:bg-[#111B33]/80 md:border md:bg-[#0F1A2C] md:px-3 md:py-1.5">
          <Avatar className="size-10 border transition-all duration-300 md:size-9">
            <AvatarFallback className="bg-primary text-xs font-semibold text-white">
              {user?.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="hidden flex-col items-start md:flex">
            <span className="text-sm leading-none font-semibold text-white">{user?.name}</span>
            <span className="text-gray mt-1 text-[10px] font-semibold tracking-widest uppercase">
              {user?.role}
            </span>
          </div>
          <ChevronDown className="text-gray hidden h-4 w-4 md:block" />
        </button>
      </DropdownMenuTrigger>
      {/* Dropdown Menu Content */}
      <DropdownMenuContent
        className="rounded-ms animate-in fade-in zoom-in-95 z-100 w-64 border-white/10 bg-[#0F1A2C] p-2 shadow-xl backdrop-blur-xl duration-200"
        align="end"
        sideOffset={10}
      >
        <DropdownMenuLabel>
          <p className="text-gray text-xs font-semibold tracking-[0.2em] uppercase">
            Manage Profile
          </p>
          <p className="text-gray mt-0.5 text-sm">{user.email}</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-white/5" />

        <DropdownMenuGroup className="space-y-1">
          <DropdownMenuItem className="text-gray flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all outline-none hover:bg-white/5 hover:text-white! focus:bg-white/5 active:text-white!">
            <User className="h-4 w-4" />
            Profile Settings
          </DropdownMenuItem>
          <DropdownMenuItem className="text-gray flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all outline-none hover:bg-white/5 hover:text-white! focus:bg-white/5 active:text-white!">
            <Bell className="h-4 w-4" />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-white/5" />

        <div>
          <DropdownMenuItem
            onClick={handleLogout}
            className="text-error hover:bg-error/10 focus:bg-error/10 hover:text-error! active:text-error! flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm font-bold transition-all outline-none"
          >
            <LogOut className="h-4 w-4" />
            Logout Account
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
