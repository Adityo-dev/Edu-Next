'use client';

import { AlertCircle, CheckCircle, Clock, Wallet } from 'lucide-react';
import { JSX, useState } from 'react';

const withdrawalHistory = [
  {
    id: 'WD-001',
    amount: 8000,
    method: 'bKash',
    account: '01700-000000',
    status: 'completed',
    date: 'Apr 20, 2025',
    processedDate: 'Apr 21, 2025',
  },
  {
    id: 'WD-002',
    amount: 5000,
    method: 'bKash',
    account: '01700-000000',
    status: 'completed',
    date: 'Apr 1, 2025',
    processedDate: 'Apr 2, 2025',
  },
  {
    id: 'WD-003',
    amount: 10000,
    method: 'Bank Transfer',
    account: 'Dutch Bangla Bank ****1234',
    status: 'pending',
    date: 'Apr 22, 2025',
    processedDate: null,
  },
];

const statusConfig: Record<string, { icon: JSX.Element; color: string; label: string }> = {
  completed: {
    icon: <CheckCircle size={15} />,
    color: 'bg-emerald-50 text-primary',
    label: 'Completed',
  },
  pending: { icon: <Clock size={15} />, color: 'bg-yellow-50 text-yellow-600', label: 'Pending' },
  rejected: { icon: <AlertCircle size={15} />, color: 'bg-red-50 text-red-500', label: 'Rejected' },
};

const WithdrawalPage = () => {
  const [method, setMethod] = useState('bKash');
  const [amount, setAmount] = useState('');
  const [account, setAccount] = useState('');

  const balance = 12300;
  const minWithdrawal = 500;

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-text-primary text-2xl font-black">Withdrawal</h1>
          <p className="text-text-secondary mt-1 text-sm">Request your earnings withdrawal.</p>
        </div>

        {/* Balance Card */}
        <div className="bg-primary relative overflow-hidden rounded-md p-7">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(#ffffff 1.5px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="mb-1 text-sm text-white/60">Available to Withdraw</p>
              <p className="text-4xl font-black text-white">৳{balance.toLocaleString()}</p>
            </div>
            <Wallet size={48} className="text-white/20" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Request Form */}
          <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs">
            <h2 className="mb-5 text-lg font-bold">New Withdrawal Request</h2>

            <div className="space-y-4">
              {/* Method */}
              <div>
                <label className="mb-2 block text-xs font-bold tracking-wider text-slate-500 uppercase">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['bKash', 'Nagad', 'Bank'].map((m) => (
                    <button
                      key={m}
                      onClick={() => setMethod(m)}
                      className={`rounded-sm border py-3 text-sm font-bold transition-all ${
                        method === m
                          ? 'border-primary text-primary bg-emerald-50'
                          : 'border-slate-200 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Account */}
              <div>
                <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
                  {method === 'Bank' ? 'Bank Account Number' : `${method} Number`}
                </label>
                <input
                  type="text"
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  placeholder={method === 'Bank' ? 'Account number' : '01700-000000'}
                  className="focus:border-primary w-full rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              {/* Amount */}
              <div>
                <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
                  Amount (BDT)
                </label>
                <div className="relative">
                  <span className="absolute top-1/2 left-4 -translate-y-1/2 font-bold text-slate-400">
                    ৳
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder={`Min. ৳${minWithdrawal}`}
                    className="focus:border-primary w-full rounded-sm border border-slate-200 bg-slate-50 py-3 pr-4 pl-9 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
                {amount && parseInt(amount) > balance && (
                  <p className="mt-1 text-xs text-red-500">Amount exceeds available balance.</p>
                )}
                {amount && parseInt(amount) < minWithdrawal && (
                  <p className="mt-1 text-xs text-yellow-600">
                    Minimum withdrawal is ৳{minWithdrawal}.
                  </p>
                )}
              </div>

              {/* Quick Amounts */}
              <div>
                <label className="mb-2 block text-xs font-bold tracking-wider text-slate-500 uppercase">
                  Quick Select
                </label>
                <div className="flex gap-2">
                  {[1000, 3000, 5000, 10000].map((q) => (
                    <button
                      key={q}
                      onClick={() => setAmount(String(q))}
                      className={`flex-1 rounded-sm border py-2 text-xs font-bold transition-all ${
                        amount === String(q)
                          ? 'border-primary text-primary bg-emerald-50'
                          : 'border-slate-200 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      ৳{q.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-sm border border-emerald-100 bg-emerald-50 p-3 text-xs leading-relaxed text-slate-600">
                ✅ Withdrawals are processed within{' '}
                <span className="font-bold">1-2 business days</span> after admin approval.
              </div>

              <button
                disabled={
                  !amount ||
                  !account ||
                  parseInt(amount) > balance ||
                  parseInt(amount) < minWithdrawal
                }
                className="bg-secondary w-full rounded-sm py-3.5 text-sm font-bold text-white transition-all hover:bg-[#d98c0a] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Submit Withdrawal Request
              </button>
            </div>
          </div>

          {/* History */}
          <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs">
            <h2 className="mb-5 text-lg font-bold">Withdrawal History</h2>
            <div className="space-y-3">
              {withdrawalHistory.map((wd) => {
                const config = statusConfig[wd.status];
                return (
                  <div key={wd.id} className="rounded-sm border border-slate-100 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400">{wd.id}</span>
                      <span
                        className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${config.color}`}
                      >
                        {config.icon}
                        {config.label}
                      </span>
                    </div>
                    <p className="text-text-primary text-xl font-black">
                      ৳{wd.amount.toLocaleString()}
                    </p>
                    <p className="text-text-secondary mt-0.5 text-xs">
                      {wd.method} • {wd.account}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                      <span>Requested: {wd.date}</span>
                      {wd.processedDate && <span>Processed: {wd.processedDate}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalPage;
