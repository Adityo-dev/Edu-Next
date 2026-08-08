'use client';

import { roleTypes } from '@/components/dashboard/sidebar/sidebarRoutes';
import DynamicActionButton from '../../../DynamicActionButton/DynamicActionButton';
import NotificationDropdown from './NotificationDropdown/NotificationDropdown';
import UserDropdown from './UserDropdown/UserDropdown';

function RightSection({ role }: { role: roleTypes }) {
  return (
    <div className="flex items-center gap-3">
      {/* Notification Dropdown */}
      <NotificationDropdown role={role} />

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
