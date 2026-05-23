'use client';

import { ArrowDownLeft, ArrowUpRight, Clock, TrendingUp, Wallet } from 'lucide-react';
import Link from 'next/link';

const transactions = [
  {
    id: 1,
    type: 'credit',
    desc: 'Sale: Web Development Bootcamp',
    amount: 1200,
    date: 'Apr 22, 2025',
    student: 'Sumaiya Akter',
  },
  {
    id: 2,
    type: 'credit',
    desc: 'Sale: React.js Masterclass',
    amount: 1440,
    date: 'Apr 21, 2025',
    student: 'Nusrat Jahan',
  },
  {
    id: 3,
    type: 'debit',
    desc: 'Withdrawal to bKash',
    amount: 8000,
    date: 'Apr 20, 2025',
    student: null,
  },
  {
    id: 4,
    type: 'credit',
    desc: 'Sale: Web Development Bootcamp',
    amount: 1200,
    date: 'Apr 19, 2025',
    student: 'Arif Hossain',
  },
  {
    id: 5,
    type: 'credit',
    desc: 'Sale: JavaScript ES6+',
    amount: 720,
    date: 'Apr 18, 2025',
    student: 'Rakib Ahmed',
  },
  {
    id: 6,
    type: 'credit',
    desc: 'Sale: React.js Masterclass',
    amount: 1440,
    date: 'Apr 17, 2025',
    student: 'Fatima Begum',
  },
  {
    id: 7,
    type: 'debit',
    desc: 'Withdrawal to bKash',
    amount: 5000,
    date: 'Apr 1, 2025',
    student: null,
  },
];

const InstructorWalletPage = () => {
  const credits = transactions.filter((t) => t.type === 'credit').reduce((a, b) => a + b.amount, 0);
  const debits = transactions.filter((t) => t.type === 'debit').reduce((a, b) => a + b.amount, 0);
  const balance = credits - debits;

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-text-primary text-2xl font-black">My Wallet</h1>
          <p className="text-text-secondary mt-1 text-sm">
            Track your earnings and transaction history.
          </p>
        </div>

        {/* Wallet Card */}
        <div className="bg-primary relative overflow-hidden rounded-md p-8">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(#ffffff 1.5px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />
          <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/5 blur-3xl" />
          <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Wallet size={20} className="text-white/70" />
                <span className="text-sm text-white/60">Available Balance</span>
              </div>
              <p className="text-5xl font-black text-white">৳{balance.toLocaleString()}</p>
              <p className="mt-2 text-sm text-white/60">After 20% platform commission deducted</p>
            </div>
            <Link
              href="/dashboard/instructor/withdrawal"
              className="bg-secondary flex items-center gap-2 rounded-sm px-8 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#d98c0a] active:scale-95"
            >
              <ArrowUpRight size={16} />
              Request Withdrawal
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              icon: <TrendingUp size={20} />,
              label: 'Total Earned',
              value: `৳${credits.toLocaleString()}`,
              color: 'bg-emerald-50 text-primary',
            },
            {
              icon: <ArrowUpRight size={20} />,
              label: 'Total Withdrawn',
              value: `৳${debits.toLocaleString()}`,
              color: 'bg-orange-50 text-secondary',
            },
            {
              icon: <Clock size={20} />,
              label: 'Pending Clearance',
              value: '৳0',
              color: 'bg-blue-50 text-blue-600',
            },
          ].map((stat, i) => (
            <div key={i} className="rounded-md border border-slate-100 bg-white p-5 shadow-xs">
              <div
                className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-sm ${stat.color}`}
              >
                {stat.icon}
              </div>
              <p className="text-text-primary text-2xl font-black">{stat.value}</p>
              <p className="text-text-secondary text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Transactions */}
        <div className="rounded-md border border-slate-100 bg-white shadow-xs">
          <div className="border-b border-slate-100 px-6 py-4">
            <h2 className="text-lg font-bold">Transaction History</h2>
          </div>
          <div className="divide-y divide-slate-50">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-slate-50"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${tx.type === 'credit' ? 'text-primary bg-emerald-50' : 'text-secondary bg-orange-50'}`}
                  >
                    {tx.type === 'credit' ? (
                      <ArrowDownLeft size={18} />
                    ) : (
                      <ArrowUpRight size={18} />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{tx.desc}</p>
                    <p className="text-text-secondary text-xs">
                      {tx.date}
                      {tx.student && ` • ${tx.student}`}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-base font-black ${tx.type === 'credit' ? 'text-primary' : 'text-secondary'}`}
                >
                  {tx.type === 'credit' ? '+' : '-'}৳{tx.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorWalletPage;
