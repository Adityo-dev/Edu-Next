'use client';

import PasswordSettings from '@/components/dashboard/Settings/PasswordSettings/PasswordSettings';
import ProfileSettings from '@/components/dashboard/Settings/ProfileSettings/ProfileSettings';
import { Bell, Globe, Lock, Save, Shield } from 'lucide-react';
import { useState } from 'react';
import PlatformConfigSettings from './_components/PlatformConfigSettings/PlatformConfigSettings';

const AdminSettingsPage = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'password' | 'platform' | 'security'>(
    'profile',
  );
  const [security, setSecurity] = useState({
    twoFactor: true,
    loginAlerts: true,
    ipWhitelist: false,
  });

  const tabs = [
    { key: 'profile', label: 'Admin Profile', icon: <Shield size={16} /> },
    { key: 'password', label: 'Password', icon: <Lock size={16} /> },
    { key: 'platform', label: 'Platform', icon: <Globe size={16} /> },
    { key: 'security', label: 'Security', icon: <Bell size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        <div>
          <h1 className="text-text-primary text-2xl font-black">Settings</h1>
          <p className="text-text-secondary mt-1 text-sm">
            Manage admin profile and platform configuration.
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar */}
          <div className="w-full rounded-md border border-slate-100 bg-white p-3 shadow-xs lg:w-56 lg:shrink-0 lg:self-start">
            <div className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as typeof activeTab)}
                  className={`flex w-full items-center gap-3 rounded-sm px-4 py-3 text-sm font-semibold transition-all ${activeTab === tab.key ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 rounded-md border border-slate-100 bg-white p-6 shadow-xs">
            {/* Profile */}
            {activeTab === 'profile' && <ProfileSettings />}

            {/* Password */}
            {activeTab === 'password' && <PasswordSettings />}

            {/* Platform */}
            {activeTab === 'platform' && <PlatformConfigSettings />}

            {/* Security */}
            {activeTab === 'security' && (
              <div className="space-y-5">
                <h2 className="text-lg font-bold">Security Settings</h2>
                <div className="space-y-3">
                  {[
                    {
                      key: 'twoFactor',
                      label: 'Two-Factor Authentication',
                      desc: 'Require OTP on every admin login',
                    },
                    {
                      key: 'loginAlerts',
                      label: 'Login Alerts',
                      desc: 'Email alert on every new login',
                    },
                    {
                      key: 'ipWhitelist',
                      label: 'IP Whitelist',
                      desc: 'Only allow access from trusted IPs',
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
                          setSecurity({
                            ...security,
                            [item.key]: !security[item.key as keyof typeof security],
                          })
                        }
                        className={`relative h-6 w-11 rounded-full transition-all duration-300 ${security[item.key as keyof typeof security] ? 'bg-primary' : 'bg-slate-200'}`}
                      >
                        <div
                          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-300 ${security[item.key as keyof typeof security] ? 'left-5' : 'left-0.5'}`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="rounded-sm border border-slate-100 bg-slate-50 p-4 text-xs leading-relaxed text-slate-600">
                  🔒 Last login: <span className="font-semibold">Apr 22, 2025 • 10:30 AM</span> from
                  IP 103.121.x.x (Dhaka, Bangladesh)
                </div>
                <button className="bg-primary flex items-center gap-2 rounded-sm px-6 py-3 text-sm font-bold text-white hover:bg-[#2a6159]">
                  <Save size={15} />
                  Save Security Settings
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
