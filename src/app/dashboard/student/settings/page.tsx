'use client';

import { Bell, Eye, EyeOff, Globe, Lock, Save, Shield, Trash2, User } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'password' | 'notifications' | 'privacy'>(
    'profile',
  );
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [profile, setProfile] = useState({
    name: 'Sumaiya Akter',
    email: 'sumaiya@example.com',
    phone: '+880 1700-000000',
    bio: 'Passionate learner from Dhaka, Bangladesh.',
    language: 'বাংলা',
  });

  const [notifications, setNotifications] = useState({
    liveSession: true,
    newLesson: true,
    certificate: true,
    support: true,
    marketing: false,
  });

  const tabs = [
    { key: 'profile', label: 'Profile', icon: <User size={16} /> },
    { key: 'password', label: 'Password', icon: <Lock size={16} /> },
    { key: 'notifications', label: 'Notifications', icon: <Bell size={16} /> },
    { key: 'privacy', label: 'Privacy', icon: <Shield size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-text-primary text-2xl font-black">Settings</h1>
          <p className="text-text-secondary mt-1 text-sm">Manage your account and preferences.</p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar Tabs */}
          <div className="w-full rounded-md border border-slate-100 bg-white p-3 shadow-xs lg:w-56 lg:shrink-0 lg:self-start">
            <div className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as typeof activeTab)}
                  className={`flex w-full items-center gap-3 rounded-sm px-4 py-3 text-sm font-semibold transition-all ${
                    activeTab === tab.key
                      ? 'bg-primary text-white'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 rounded-md border border-slate-100 bg-white p-6 shadow-xs">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold">Profile Information</h2>

                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <Image
                    src="https://i.pravatar.cc/150?u=sumaiya"
                    alt="Profile"
                    width={72}
                    height={72}
                    className="rounded-full border-4 border-emerald-50 shadow-sm"
                  />
                  <div>
                    <button className="bg-primary rounded-sm px-4 py-2 text-xs font-bold text-white transition-all hover:bg-[#2a6159]">
                      Change Photo
                    </button>
                    <p className="text-text-secondary mt-1 text-xs">JPG, PNG max 2MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[
                    {
                      label: 'Full Name',
                      key: 'name',
                      type: 'text',
                      placeholder: 'Your full name',
                    },
                    { label: 'Phone', key: 'phone', type: 'tel', placeholder: '+880...' },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        value={profile[field.key as keyof typeof profile]}
                        onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                        placeholder={field.placeholder}
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
                    <p className="text-text-secondary mt-1 text-xs">Email cannot be changed.</p>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
                      Bio
                    </label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      rows={3}
                      className="focus:border-primary w-full rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
                      <Globe size={12} className="mr-1 inline" />
                      Preferred Language
                    </label>
                    <select
                      value={profile.language}
                      onChange={(e) => setProfile({ ...profile, language: e.target.value })}
                      className="focus:border-primary w-full cursor-pointer rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
                    >
                      <option>বাংলা</option>
                      <option>English</option>
                    </select>
                  </div>
                </div>

                <button className="bg-primary flex items-center gap-2 rounded-sm px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#2a6159]">
                  <Save size={15} />
                  Save Changes
                </button>
              </div>
            )}

            {/* Password Tab */}
            {activeTab === 'password' && (
              <div className="space-y-5">
                <h2 className="text-lg font-bold">Change Password</h2>

                {[
                  { label: 'Current Password', show: showOld, setShow: setShowOld },
                  { label: 'New Password', show: showNew, setShow: setShowNew },
                  { label: 'Confirm New Password', show: showConfirm, setShow: setShowConfirm },
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

                <div className="rounded-sm bg-emerald-50 p-4 text-xs leading-relaxed text-slate-600">
                  ✅ Password must be at least 8 characters with uppercase, lowercase, and a number.
                </div>

                <button className="bg-primary flex items-center gap-2 rounded-sm px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#2a6159]">
                  <Save size={15} />
                  Update Password
                </button>
              </div>
            )}

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
      </div>
    </div>
  );
};

export default SettingsPage;
