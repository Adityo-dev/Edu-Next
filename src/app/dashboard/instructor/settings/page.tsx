'use client';

import { Lock, Shield, User, Video } from 'lucide-react';
import { useState } from 'react';
import SettingsSidebar from './_components/SettingsSidebar/SettingsSidebar';
import ProfileSettings from './_components/ProfileSettings/ProfileSettings';
import PasswordSettings from './_components/PasswordSettings/PasswordSettings';
import NotificationSettings from './_components/NotificationSettings/NotificationSettings';
import PrivacySettings from './_components/PrivacySettings/PrivacySettings';

const InstructorSettingsPage = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'password' | 'notifications' | 'privacy'>(
    'profile',
  );
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Md. Rafiqul Islam',
    email: 'rafiq@example.com',
    phone: '+880 1700-000000',
    bio: 'Senior Web Developer with 8+ years of experience. Teaching on EduNext since 2022.',
    expertise: 'Web Development',
    language: 'বাংলা',
    youtube: '',
    linkedin: '',
  });
  const [notifications, setNotifications] = useState({
    newEnrollment: true,
    newReview: true,
    withdrawal: true,
    courseApproval: true,
    marketing: false,
  });

  const tabs = [
    { key: 'profile', label: 'Profile', icon: <User size={16} /> },
    { key: 'password', label: 'Password', icon: <Lock size={16} /> },
    { key: 'notifications', label: 'Notifications', icon: <Video size={16} /> },
    { key: 'privacy', label: 'Privacy', icon: <Shield size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        <div>
          <h1 className="text-text-primary text-2xl font-black">Settings</h1>
          <p className="text-text-secondary mt-1 text-sm">
            Manage your instructor profile and preferences.
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar */}
          <SettingsSidebar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Content */}
          <div className="flex-1 rounded-md border border-slate-100 bg-white p-6 shadow-xs">
            {activeTab === 'profile' && (
              <ProfileSettings profile={profile} setProfile={setProfile} />
            )}

            {activeTab === 'password' && (
              <PasswordSettings
                showOld={showOld}
                setShowOld={setShowOld}
                showNew={showNew}
                setShowNew={setShowNew}
                showConfirm={showConfirm}
                setShowConfirm={setShowConfirm}
              />
            )}

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
