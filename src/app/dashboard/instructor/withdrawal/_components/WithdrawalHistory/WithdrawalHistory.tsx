import React, { JSX } from 'react';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

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

const WithdrawalHistory = () => {
  return (
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
              <p className="text-text-primary text-xl font-black">৳{wd.amount.toLocaleString()}</p>
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
  );
};

export default WithdrawalHistory;
