'use client';

import { CheckCircle, Clock, Wallet, XCircle } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const withdrawalsData = [
  {
    id: 'WD-001',
    instructor: 'Md. Rafiqul Islam',
    image: 'https://i.pravatar.cc/150?u=rafiq',
    amount: 8000,
    method: 'bKash',
    account: '01700-000000',
    walletBalance: 12300,
    requestedDate: 'Apr 22, 2025',
    status: 'pending',
  },
  {
    id: 'WD-002',
    instructor: 'Farhan Hossain',
    image: 'https://i.pravatar.cc/150?u=farhan',
    amount: 5000,
    method: 'Nagad',
    account: '01800-111111',
    walletBalance: 7800,
    requestedDate: 'Apr 21, 2025',
    status: 'pending',
  },
  {
    id: 'WD-003',
    instructor: 'Nasrin Sultana',
    image: 'https://i.pravatar.cc/150?u=nasrin',
    amount: 3000,
    method: 'bKash',
    account: '01900-222222',
    walletBalance: 4200,
    requestedDate: 'Apr 20, 2025',
    status: 'pending',
  },
  {
    id: 'WD-004',
    instructor: 'Sabbir Hossain',
    image: 'https://i.pravatar.cc/150?u=sabbir',
    amount: 10000,
    method: 'Bank Transfer',
    account: 'Dutch Bangla ****1234',
    walletBalance: 15000,
    requestedDate: 'Apr 18, 2025',
    status: 'approved',
  },
  {
    id: 'WD-005',
    instructor: 'Imran Hossain',
    image: 'https://i.pravatar.cc/150?u=imran',
    amount: 2000,
    method: 'bKash',
    account: '01700-333333',
    walletBalance: 1500,
    requestedDate: 'Apr 15, 2025',
    status: 'rejected',
  },
];

const statusConfig: Record<string, string> = {
  pending: 'bg-yellow-50 text-yellow-600',
  approved: 'bg-emerald-50 text-primary',
  rejected: 'bg-red-50 text-red-500',
};

const WithdrawalRequestsPage = () => {
  const [filter, setFilter] = useState('all');

  const filtered = withdrawalsData.filter((w) => filter === 'all' || w.status === filter);
  const totalPending = withdrawalsData
    .filter((w) => w.status === 'pending')
    .reduce((a, b) => a + b.amount, 0);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        <div>
          <h1 className="text-text-primary text-2xl font-black">Withdrawal Requests</h1>
          <p className="text-text-secondary mt-1 text-sm">
            Review and process instructor withdrawal requests.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            {
              label: 'Pending Requests',
              value: withdrawalsData.filter((w) => w.status === 'pending').length,
              color: 'text-yellow-600',
            },
            {
              label: 'Total Pending Amount',
              value: `৳${totalPending.toLocaleString()}`,
              color: 'text-secondary',
            },
            {
              label: 'Approved',
              value: withdrawalsData.filter((w) => w.status === 'approved').length,
              color: 'text-primary',
            },
            {
              label: 'Rejected',
              value: withdrawalsData.filter((w) => w.status === 'rejected').length,
              color: 'text-red-500',
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-md border border-slate-100 bg-white p-5 text-center shadow-xs"
            >
              <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
              <p className="text-text-secondary text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex w-fit overflow-hidden rounded-sm border border-slate-200 bg-white shadow-xs">
          {['all', 'pending', 'approved', 'rejected'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2.5 text-sm font-semibold capitalize transition-all ${filter === tab ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="space-y-4">
          {filtered.map((wd) => (
            <div
              key={wd.id}
              className={`rounded-md border bg-white p-5 shadow-xs ${wd.status === 'pending' ? 'border-yellow-100' : 'border-slate-100'}`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex flex-1 items-center gap-4">
                  <Image
                    src={wd.image}
                    alt={wd.instructor}
                    width={44}
                    height={44}
                    className="rounded-full border-2 border-emerald-50"
                  />
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="font-bold">{wd.instructor}</h3>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-bold capitalize ${statusConfig[wd.status]}`}
                      >
                        {wd.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Wallet size={11} />
                        Wallet: ৳{wd.walletBalance.toLocaleString()}
                      </span>
                      <span>•</span>
                      <span>
                        {wd.method}: {wd.account}
                      </span>
                      <span>•</span>
                      <span>
                        <Clock size={11} className="mr-1 inline" />
                        {wd.requestedDate}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <div className="text-right">
                    <p className="text-text-primary text-2xl font-black">
                      ৳{wd.amount.toLocaleString()}
                    </p>
                    <p className="text-text-secondary text-xs">{wd.id}</p>
                  </div>
                  {wd.status === 'pending' && (
                    <div className="flex gap-2">
                      <button className="bg-primary flex items-center gap-2 rounded-sm px-5 py-2.5 text-sm font-bold text-white hover:bg-[#2a6159]">
                        <CheckCircle size={14} /> Approve
                      </button>
                      <button className="flex items-center gap-2 rounded-sm border border-red-100 px-5 py-2.5 text-sm font-bold text-red-400 hover:bg-red-50">
                        <XCircle size={14} /> Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WithdrawalRequestsPage;
