'use client';

import DynamicTableFilterBar from '@/components/dashboard/DynamicTableFilterBar/DynamicTableFilterBar';
import SectionHeader from '@/components/dashboard/SectionHeader/SectionHeader';
import PasswordSettings from '@/components/dashboard/Settings/PasswordSettings/PasswordSettings';
import ProfileSettings from '@/components/dashboard/Settings/ProfileSettings/ProfileSettings';
import { Save, Trash2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const SettingsPage = () => {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'profile';

  const [notifications, setNotifications] = useState({
    liveSession: true,
    newLesson: true,
    certificate: true,
    support: true,
    marketing: false,
  });

  return (
    <div className="mx-auto space-y-6">
      {/* Header */}
      <SectionHeader title="Settings" description="Manage your account and preferences." />

      <DynamicTableFilterBar
        fields={[
          {
            name: 'tab',
            type: 'tabs',
            value: 'profile',
            options: [
              { label: 'Profile', value: 'profile' },
              { label: 'Password', value: 'password' },
              { label: 'Notifications', value: 'notifications' },
              { label: 'Privacy', value: 'privacy' },
            ],
          },
        ]}
      />

      {/* Content */}
      <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs">
        {/* Profile Tab */}
        {activeTab === 'profile' && <ProfileSettings />}

        {/* Password Tab */}
        {activeTab === 'password' && <PasswordSettings />}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold">Notification Preferences</h2>

            <div className="space-y-3">
              {[
                {
                  key: 'liveSession',
                  label: 'Live Session Reminders',
                  desc: 'Get notified before live classes start',
                },
                {
                  key: 'newLesson',
                  label: 'New Lesson Added',
                  desc: 'When instructor adds new content',
                },
                {
                  key: 'certificate',
                  label: 'Certificate Ready',
                  desc: 'When your certificate is generated',
                },
                {
                  key: 'support',
                  label: 'Support Replies',
                  desc: 'When admin replies to your ticket',
                },
                {
                  key: 'marketing',
                  label: 'Promotions & Offers',
                  desc: 'New courses and special discounts',
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between rounded-sm border border-slate-100 px-5 py-4"
                >
                  <div>
                    <p className="text-sm font-semibold">{item.label}</p>
                    <p className="text-text-secondary text-xs">{item.desc}</p>
                  </div>
                  <button
                    onClick={() =>
                      setNotifications({
                        ...notifications,
                        [item.key]: !notifications[item.key as keyof typeof notifications],
                      })
                    }
                    className={`relative h-6 w-11 rounded-full transition-all duration-300 ${
                      notifications[item.key as keyof typeof notifications]
                        ? 'bg-primary'
                        : 'bg-slate-200'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-300 ${
                        notifications[item.key as keyof typeof notifications]
                          ? 'left-5'
                          : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            <button className="bg-primary flex items-center gap-2 rounded-sm px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#2a6159]">
              <Save size={15} />
              Save Preferences
            </button>
          </div>
        )}

        {/* Privacy Tab */}
        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold">Privacy & Account</h2>

            <div className="space-y-3">
              {[
                {
                  label: 'Show my profile publicly',
                  desc: 'Other users can see your name and progress',
                },
                {
                  label: 'Show certificates on profile',
                  desc: 'Display earned certificates publicly',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-sm border border-slate-100 px-5 py-4"
                >
                  <div>
                    <p className="text-sm font-semibold">{item.label}</p>
                    <p className="text-text-secondary text-xs">{item.desc}</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="accent-primary h-4 w-4 cursor-pointer"
                  />
                </div>
              ))}
            </div>

            <div className="h-px bg-slate-100" />

            <div className="rounded-sm border border-red-100 bg-red-50 p-5">
              <h3 className="mb-1 text-sm font-bold text-red-600">Danger Zone</h3>
              <p className="text-text-secondary mb-4 text-xs leading-relaxed">
                Deleting your account will permanently remove all your data, courses, and
                certificates. This action cannot be undone.
              </p>
              <button className="flex items-center gap-2 rounded-sm border border-red-200 bg-white px-4 py-2.5 text-sm font-bold text-red-500 transition-all hover:bg-red-50">
                <Trash2 size={14} />
                Delete My Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
