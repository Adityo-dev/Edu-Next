/* eslint-disable no-unused-vars */
import { Eye, EyeOff, Lock, Save } from 'lucide-react';

interface PasswordSettingsProps {
  showOld: boolean;
  setShowOld: (s: boolean) => void;
  showNew: boolean;
  setShowNew: (s: boolean) => void;
  showConfirm: boolean;
  setShowConfirm: (s: boolean) => void;
}

const PasswordSettings = ({
  showOld,
  setShowOld,
  showNew,
  setShowNew,
  showConfirm,
  setShowConfirm,
}: PasswordSettingsProps) => {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold">Change Password</h2>
      {[
        { label: 'Current Password', show: showOld, setShow: setShowOld },
        { label: 'New Password', show: showNew, setShow: setShowNew },
        { label: 'Confirm Password', show: showConfirm, setShow: setShowConfirm },
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
      <button className="bg-primary flex items-center gap-2 rounded-sm px-6 py-3 text-sm font-bold text-white hover:bg-[#2a6159]">
        <Save size={15} /> Update Password
      </button>
    </div>
  );
};

export default PasswordSettings;
