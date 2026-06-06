'use client';

import { Bell, Eye, EyeOff, Globe, Lock, Save, Shield } from 'lucide-react';
import { useState } from 'react';

const AdminSettingsPage = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'password' | 'platform' | 'security'>(
    'profile',
  );
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Super Admin',
    email: 'admin@edunext.com.bd',
    phone: '+880 1700-000000',
  });
  const [platform, setPlatform] = useState({
    siteName: 'EduNext',
    tagline: 'Learn & Grow',
    supportEmail: 'support@edunext.com.bd',
    maintenanceMode: false,
  });
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
            {activeTab === 'profile' && (
              <div className="space-y-5">
                <h2 className="text-lg font-bold">Admin Profile</h2>
                <div className="flex items-center gap-4">
                  <div className="bg-primary flex h-16 w-16 items-center justify-center rounded-full text-2xl font-black text-white shadow-sm">
                    SA
                  </div>
                  <div>
                    <p className="font-bold">{profile.name}</p>
                    <p className="text-text-secondary text-xs">Super Administrator • Full Access</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[
                    { label: 'Full Name', key: 'name' },
                    { label: 'Phone', key: 'phone' },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        value={profile[field.key as keyof typeof profile]}
                        onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                        className="focus:border-primary w-full rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
                      />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      disabled
                      className="w-full cursor-not-allowed rounded-sm border border-slate-100 bg-slate-100 px-4 py-3 text-sm text-slate-400"
                    />
                  </div>
                </div>
                <button className="bg-primary flex items-center gap-2 rounded-sm px-6 py-3 text-sm font-bold text-white hover:bg-[#2a6159]">
                  <Save size={15} />
                  Save Changes
                </button>
              </div>
            )}

            {/* Password */}
            {activeTab === 'password' && (
              <div className="space-y-5">
                <h2 className="text-lg font-bold">Change Password</h2>
                {[
                  { label: 'Current Password', show: showOld, setShow: setShowOld },
                  { label: 'New Password', show: showNew, setShow: setShowNew },
                ].map((field, i) => (
                  <div key={i}>
                    <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
                      {field.label}
                    </label>
                    <div className="relative">
                      <Lock
                        size={15}
                        className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type={field.show ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="focus:border-primary w-full rounded-sm border border-slate-200 bg-slate-50 py-3 pr-12 pl-11 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
                      />
                      <button
                        type="button"
                        onClick={() => field.setShow(!field.show)}
                        className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400"
                      >
                        {field.show ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                ))}
                <button className="bg-primary flex items-center gap-2 rounded-sm px-6 py-3 text-sm font-bold text-white hover:bg-[#2a6159]">
                  <Save size={15} />
                  Update Password
                </button>
              </div>
            )}

            {/* Platform */}
            {activeTab === 'platform' && (
              <div className="space-y-5">
                <h2 className="text-lg font-bold">Platform Configuration</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[
                    { label: 'Site Name', key: 'siteName' },
                    { label: 'Tagline', key: 'tagline' },
                    { label: 'Support Email', key: 'supportEmail' },
                  ].map((field) => (
                    <div
                      key={field.key}
                      className={field.key === 'supportEmail' ? 'sm:col-span-2' : ''}
                    >
                      <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        value={platform[field.key as keyof typeof platform] as string}
                        onChange={(e) => setPlatform({ ...platform, [field.key]: e.target.value })}
                        className="focus:border-primary w-full rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between rounded-sm border border-red-100 bg-red-50 px-5 py-4">
                  <div>
                    <p className="text-sm font-bold text-red-600">Maintenance Mode</p>
                    <p className="text-text-secondary text-xs">
                      Temporarily disable access to the platform
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setPlatform({ ...platform, maintenanceMode: !platform.maintenanceMode })
                    }
                    className={`relative h-6 w-11 rounded-full transition-all duration-300 ${platform.maintenanceMode ? 'bg-red-500' : 'bg-slate-200'}`}
                  >
                    <div
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-300 ${platform.maintenanceMode ? 'left-5' : 'left-0.5'}`}
                    />
                  </button>
                </div>
                <button className="bg-primary flex items-center gap-2 rounded-sm px-6 py-3 text-sm font-bold text-white hover:bg-[#2a6159]">
                  <Save size={15} />
                  Save Configuration
                </button>
              </div>
            )}

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
