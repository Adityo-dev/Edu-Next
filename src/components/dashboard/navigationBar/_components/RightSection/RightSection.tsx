'use client';

import { roleTypes } from '@/components/dashboard/sidebar/sidebarRoutes';
import { Bell } from 'lucide-react';
import DynamicActionButton from '../../../DynamicActionButton/DynamicActionButton';
import UserDropdown from './UserDropdown/UserDropdown';

function RightSection({ role }: { role: roleTypes }) {
  return (
    <div className="flex items-center gap-3">
      {/* Notification Button */}
      <button className="hover:text-primary relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-sm border border-slate-200 bg-white text-slate-500 transition-all hover:border-emerald-100 hover:bg-emerald-50 active:scale-95">
        <Bell size={18} />
        {/* Unread Dot */}
        <span className="bg-secondary absolute top-1.5 right-1.5 h-2 w-2 rounded-full" />
      </button>

      {/* Admin Only */}
      {role === 'admin' && (
        <DynamicActionButton label="New Alert" showIcon className="h-9! text-sm!" />
      )}

      {/* User Dropdown */}
      <UserDropdown />
    </div>
  );
}

export default RightSection;
