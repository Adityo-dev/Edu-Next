'use client';

import { Eye, EyeOff, Lock, Save } from 'lucide-react';
import { useState } from 'react';

const PasswordSettings = () => {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
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
            <Lock size={15} className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
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
  );
};

export default PasswordSettings;
