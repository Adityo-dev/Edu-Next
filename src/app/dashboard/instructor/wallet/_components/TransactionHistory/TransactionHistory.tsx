import React from 'react';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

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

const TransactionHistory = () => {
  return (
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
                {tx.type === 'credit' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
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
  );
};

export default TransactionHistory;
