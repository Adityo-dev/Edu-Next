import React from 'react';
import { Trash2 } from 'lucide-react';

const PrivacySettings = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold">Privacy & Account</h2>
      <div className="space-y-3">
        {[
          {
            label: 'Show instructor profile publicly',
            desc: 'Students can view your profile and courses',
          },
          {
            label: 'Show student count on courses',
            desc: 'Display enrollment numbers on course cards',
          },
          {
            label: 'Allow student messages',
            desc: 'Students can send you direct messages',
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
          Deleting your account will permanently remove all your courses, students, and earnings
          history.
        </p>
        <button className="flex items-center gap-2 rounded-sm border border-red-200 bg-white px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50">
          <Trash2 size={14} /> Delete My Account
        </button>
      </div>
    </div>
  );
};

export default PrivacySettings;
