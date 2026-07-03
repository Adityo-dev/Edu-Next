'use client';

import PasswordSettings from '@/components/dashboard/Settings/PasswordSettings/PasswordSettings';
import { Lock, Shield, User, Video } from 'lucide-react';
import { useState } from 'react';
import NotificationSettings from './_components/NotificationSettings/NotificationSettings';
import PrivacySettings from './_components/PrivacySettings/PrivacySettings';
import ProfileSettings from './_components/ProfileSettings/ProfileSettings';
import SettingsSidebar from './_components/SettingsSidebar/SettingsSidebar';

const InstructorSettingsPage = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'password' | 'notifications' | 'privacy'>(
    'profile',
  );
  const [notifications, setNotifications] = useState({
    newEnrollment: true,
    newReview: true,
    withdrawal: true,
    courseApproval: true,
    marketing: false,
  });

  const tabs = [
    { key: 'profile', label: 'Profile Information', icon: <User size={16} /> },
    { key: 'password', label: 'Password & Security', icon: <Lock size={16} /> },
    { key: 'notifications', label: 'Notifications', icon: <Shield size={16} /> },
    { key: 'privacy', label: 'Privacy', icon: <Video size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        <div>
          <h1 className="text-text-primary text-2xl font-black">Settings</h1>
          <p className="text-text-secondary mt-1 text-sm">
            Manage your instructor profile, security, and notification preferences.
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar */}
          <SettingsSidebar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Content */}
          <div className="flex-1 rounded-md border border-slate-100 bg-white p-6 shadow-xs">
            {activeTab === 'profile' && <ProfileSettings />}

            {activeTab === 'password' && <PasswordSettings />}

            {activeTab === 'notifications' && (
              <NotificationSettings
                notifications={notifications}
                setNotifications={setNotifications}
              />
            )}

            {activeTab === 'privacy' && <PrivacySettings />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSettingsPage;
