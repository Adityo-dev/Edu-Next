'use client';

import { BadgePercent, CircleDollarSign, Save, TrendingUp } from 'lucide-react';
import { useState } from 'react';

const CommissionSettingsPage = () => {
  const [commission, setCommission] = useState(20);
  const [preview, setPreview] = useState(1500);
  const [saved, setSaved] = useState(false);

  const instructorEarning = preview * ((100 - commission) / 100);
  const platformEarning = preview * (commission / 100);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const history = [
    { date: 'Jan 1, 2025', from: 15, to: 20, changedBy: 'Super Admin' },
    { date: 'Jun 1, 2024', from: 20, to: 15, changedBy: 'Super Admin' },
    { date: 'Jan 1, 2024', from: 25, to: 20, changedBy: 'Super Admin' },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        <div>
          <h1 className="text-text-primary text-2xl font-black">Commission Settings</h1>
          <p className="text-text-secondary mt-1 text-sm">
            Set the platform commission rate for all course sales.
          </p>
        </div>

        {/* Current Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              icon: <BadgePercent size={20} />,
              label: 'Current Rate',
              value: `${commission}%`,
              color: 'text-primary',
            },
            {
              icon: <CircleDollarSign size={20} />,
              label: 'Commission Earned',
              value: '৳49,700',
              color: 'text-secondary',
            },
            {
              icon: <TrendingUp size={20} />,
              label: 'Total Revenue',
              value: '৳2,48,500',
              color: 'text-blue-500',
            },
          ].map((stat, i) => (
            <div key={i} className="rounded-md border border-slate-100 bg-white p-5 shadow-xs">
              <div className="text-primary mb-3 inline-flex h-10 w-10 items-center justify-center rounded-sm bg-emerald-50">
                {stat.icon}
              </div>
              <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
              <p className="text-text-secondary text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Commission Editor */}
          <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs">
            <h2 className="mb-6 text-lg font-bold">Set Commission Rate</h2>

            {/* Big Display */}
            <div className="mb-8 text-center">
              <div className="bg-primary mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full shadow-lg shadow-emerald-200">
                <span className="text-4xl font-black text-white">{commission}%</span>
              </div>
              <p className="text-text-secondary text-sm">Platform Commission Rate</p>
            </div>

            {/* Slider */}
            <div className="mb-6">
              <div className="mb-2 flex justify-between text-xs text-slate-500">
                <span>5%</span>
                <span>50%</span>
              </div>
              <input
                type="range"
                min={5}
                max={50}
                step={1}
                value={commission}
                onChange={(e) => setCommission(Number(e.target.value))}
                className="accent-primary w-full cursor-pointer"
              />
            </div>

            {/* Quick Select */}
            <div className="mb-6 grid grid-cols-4 gap-2">
              {[10, 15, 20, 25].map((v) => (
                <button
                  key={v}
                  onClick={() => setCommission(v)}
                  className={`rounded-sm border py-2.5 text-sm font-bold transition-all ${commission === v ? 'border-primary text-primary bg-emerald-50' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}
                >
                  {v}%
                </button>
              ))}
            </div>

            <button
              onClick={handleSave}
              className={`flex w-full items-center justify-center gap-2 rounded-sm py-3.5 text-sm font-bold text-white transition-all ${saved ? 'bg-emerald-400' : 'bg-primary hover:bg-[#2a6159]'}`}
            >
              <Save size={15} />
              {saved ? 'Saved Successfully!' : 'Save Commission Rate'}
            </button>
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs">
              <h2 className="mb-5 text-lg font-bold">Revenue Preview</h2>
              <div className="mb-4">
                <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
                  Sample Course Price (৳)
                </label>
                <input
                  type="number"
                  value={preview}
                  onChange={(e) => setPreview(Number(e.target.value))}
                  className="focus:border-primary w-full rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-sm bg-slate-50 px-4 py-3">
                  <span className="text-sm text-slate-600">Course Price</span>
                  <span className="font-bold">৳{preview.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between rounded-sm bg-orange-50 px-4 py-3">
                  <span className="text-secondary text-sm font-semibold">
                    Platform ({commission}%)
                  </span>
                  <span className="text-secondary font-black">
                    +৳{platformEarning.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-sm bg-emerald-50 px-4 py-3">
                  <span className="text-primary text-sm font-semibold">
                    Instructor ({100 - commission}%)
                  </span>
                  <span className="text-primary font-black">
                    ৳{instructorEarning.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Bar */}
              <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
                <div className="flex h-full">
                  <div
                    className="bg-secondary transition-all"
                    style={{ width: `${commission}%` }}
                  />
                  <div className="bg-primary flex-1 transition-all" />
                </div>
              </div>
              <div className="mt-2 flex justify-between text-xs text-slate-400">
                <span>Platform {commission}%</span>
                <span>Instructor {100 - commission}%</span>
              </div>
            </div>

            {/* Change History */}
            <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs">
              <h2 className="mb-4 text-base font-bold">Change History</h2>
              <div className="space-y-3">
                {history.map((h, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div>
                      <span className="font-bold text-red-400">{h.from}%</span>
                      <span className="mx-2 text-slate-400">→</span>
                      <span className="text-primary font-bold">{h.to}%</span>
                    </div>
                    <span className="text-text-secondary text-xs">{h.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommissionSettingsPage;
