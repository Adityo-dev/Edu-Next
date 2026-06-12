'use client';

import { Globe, Save } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    name: 'Sumaiya Akter',
    email: 'sumaiya@example.com',
    phone: '+880 1700-000000',
    bio: 'Passionate learner from Dhaka, Bangladesh.',
    language: 'বাংলা',
  });

  return (
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
  );
};

export default ProfileSettings;
