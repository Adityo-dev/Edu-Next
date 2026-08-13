'use client';

import SectionHeader from '@/components/dashboard/SectionHeader/SectionHeader';
import PasswordSettings from '@/components/dashboard/Settings/PasswordSettings/PasswordSettings';
import { Lock, Shield, User, Video } from 'lucide-react';
import { useState } from 'react';
import NotificationSettings from './_components/NotificationSettings/NotificationSettings';
import PrivacySettings from './_components/PrivacySettings/PrivacySettings';
import InstructorProfileSettings from './_components/InstructorProfileSettings/InstructorProfileSettings';
import PayoutSettings from './_components/PayoutSettings/PayoutSettings';
import SettingsSidebar from './_components/SettingsSidebar/SettingsSidebar';
import { CreditCard } from 'lucide-react';

const InstructorSettingsPage = () => {
  const [activeTab, setActiveTab] = useState<
    'profile' | 'password' | 'notifications' | 'privacy' | 'payout'
  >('profile');
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
    { key: 'payout', label: 'Payout Settings', icon: <CreditCard size={16} /> },
  ];

  return (
    <section>
      <div className="mx-auto space-y-5">
        <SectionHeader
          title="Settings"
          description=" Manage your instructor profile, security, and notification preferences."
        />

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar */}
          <SettingsSidebar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Content */}
          <div className="flex-1 rounded-md border border-slate-100 bg-white p-6 shadow-xs">
            {activeTab === 'profile' && <InstructorProfileSettings />}

            {activeTab === 'password' && <PasswordSettings />}

            {activeTab === 'notifications' && (
              <NotificationSettings
                notifications={notifications}
                setNotifications={setNotifications}
              />
            )}

            {activeTab === 'privacy' && <PrivacySettings />}

            {activeTab === 'payout' && <PayoutSettings />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstructorSettingsPage;
