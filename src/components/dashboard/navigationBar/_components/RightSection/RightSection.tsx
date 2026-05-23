import { roleTypes } from '@/components/dashboard/sidebar/sidebarRoutes';

import { Bell } from 'lucide-react';
import DynamicActionButton from '../../../DynamicActionButton/DynamicActionButton';
import UserDropdown from './UserDropdown/UserDropdown';

function RightSection({ role }: { role: roleTypes }) {
  return (
    <div className="flex items-center gap-3">
      {/* Notification Button */}
      <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-gray-800 bg-[#161F2F]/50 text-gray-400 transition-all hover:bg-[#161F2F] hover:text-white">
        <Bell size={20} />
      </button>

      {/* New Alert Only for Admin */}
      {role === 'admin' && (
        <DynamicActionButton label="New Alert" showIcon className="h-10! text-sm!" />
      )}

      {/* User Dropdown */}
      <UserDropdown />
    </div>
  );
}

export default RightSection;
