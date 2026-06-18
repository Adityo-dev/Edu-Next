/* eslint-disable no-unused-vars */
'use client';

import { Bell, Lock, Shield, User } from 'lucide-react';

interface SettingsTabsProps {
  activeTab: 'profile' | 'password' | 'notifications' | 'privacy';
  setActiveTab: (value: 'profile' | 'password' | 'notifications' | 'privacy') => void;
}

const SettingsTabs = ({ activeTab, setActiveTab }: SettingsTabsProps) => {
  const tabs = [
    { key: 'profile' as const, label: 'Profile', icon: <User size={16} /> },
    { key: 'password' as const, label: 'Password', icon: <Lock size={16} /> },
    { key: 'notifications' as const, label: 'Notifications', icon: <Bell size={16} /> },
    { key: 'privacy' as const, label: 'Privacy', icon: <Shield size={16} /> },
  ];

  return (
    <div className="dashboard-card-container w-full p-3 lg:w-56 lg:shrink-0 lg:self-start">
      <div className="space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex w-full items-center gap-3 rounded-sm px-4 py-3 text-sm font-semibold transition-all ${
              activeTab === tab.key ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SettingsTabs;
