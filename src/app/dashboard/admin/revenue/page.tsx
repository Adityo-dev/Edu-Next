'use client';

import { ArrowDownLeft, ArrowUpRight, CircleDollarSign, Users } from 'lucide-react';

const monthlyRevenue = [
  { month: 'Nov', total: 28000, commission: 5600, instructor: 22400 },
  { month: 'Dec', total: 42000, commission: 8400, instructor: 33600 },
  { month: 'Jan', total: 35000, commission: 7000, instructor: 28000 },
  { month: 'Feb', total: 58000, commission: 11600, instructor: 46400 },
  { month: 'Mar', total: 48000, commission: 9600, instructor: 38400 },
  { month: 'Apr', total: 72000, commission: 14400, instructor: 57600 },
];

const transactions = [
  {
    id: 'TXN-001',
    student: 'Sumaiya Akter',
    course: 'Web Development Bootcamp',
    instructor: 'Md. Rafiqul Islam',
    amount: 1500,
    commission: 300,
    instructorEarning: 1200,
    date: 'Apr 22, 2025',
    method: 'bKash',
  },
  {
    id: 'TXN-002',
    student: 'Nusrat Jahan',
    course: 'UI/UX Design Masterclass',
    instructor: 'Farhan Hossain',
    amount: 1800,
    commission: 360,
    instructorEarning: 1440,
    date: 'Apr 21, 2025',
    method: 'Nagad',
  },
  {
    id: 'TXN-003',
    student: 'Arif Hossain',
    course: 'React.js Advanced',
    instructor: 'Md. Rafiqul Islam',
    amount: 1600,
    commission: 320,
    instructorEarning: 1280,
    date: 'Apr 20, 2025',
    method: 'bKash',
  },
  {
    id: 'TXN-004',
    student: 'Fatima Begum',
    course: 'Freelancing Masterclass',
    instructor: 'Sabbir Hossain',
    amount: 999,
    commission: 200,
    instructorEarning: 799,
    date: 'Apr 19, 2025',
    method: 'Rocket',
  },
  {
    id: 'TXN-005',
    student: 'Tanvir Islam',
    course: 'Digital Marketing',
    instructor: 'Nasrin Sultana',
    amount: 1200,
    commission: 240,
    instructorEarning: 960,
    date: 'Apr 18, 2025',
    method: 'bKash',
  },
];

const maxRevenue = Math.max(...monthlyRevenue.map((d) => d.total));

const RevenuePaymentsPage = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        <div>
          <h1 className="text-text-primary text-2xl font-black">Revenue & Payments</h1>
          <p className="text-text-secondary mt-1 text-sm">
            Track all transactions and revenue breakdown.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { icon: <CircleDollarSign size={20} />, label: 'Total Revenue', value: '৳2,48,500' },
            { icon: <ArrowDownLeft size={20} />, label: 'Platform Commission', value: '৳49,700' },
            { icon: <ArrowUpRight size={20} />, label: 'Instructor Earnings', value: '৳1,98,800' },
            { icon: <Users size={20} />, label: 'Total Transactions', value: '1,240' },
          ].map((stat, i) => (
            <div key={i} className="rounded-md border border-slate-100 bg-white p-5 shadow-xs">
              <div className="text-primary mb-3 inline-flex h-10 w-10 items-center justify-center rounded-sm bg-emerald-50">
                {stat.icon}
              </div>
              <p className="text-text-primary text-2xl font-black">{stat.value}</p>
              <p className="text-text-secondary text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold">Monthly Revenue Breakdown</h2>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="bg-primary h-3 w-3 rounded-sm" />
                Total
              </span>
              <span className="flex items-center gap-1.5">
                <span className="bg-secondary h-3 w-3 rounded-sm" />
                Commission
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-sm bg-blue-400" />
                Instructor
              </span>
            </div>
          </div>
          <div className="flex items-end justify-between gap-4" style={{ height: '160px' }}>
            {monthlyRevenue.map((d) => (
              <div key={d.month} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex w-full items-end gap-0.5" style={{ height: '120px' }}>
                  <div
                    className="bg-primary flex-1 rounded-sm"
                    style={{ height: `${(d.total / maxRevenue) * 100}%` }}
                  />
                  <div
                    className="bg-secondary flex-1 rounded-sm"
                    style={{ height: `${(d.commission / maxRevenue) * 100}%` }}
                  />
                  <div
                    className="flex-1 rounded-sm bg-blue-400"
                    style={{ height: `${(d.instructor / maxRevenue) * 100}%` }}
                  />
                </div>
                <span className="text-text-secondary text-xs">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Transactions Table */}
        <div className="rounded-md border border-slate-100 bg-white shadow-xs">
          <div className="border-b border-slate-100 px-6 py-4">
            <h2 className="text-lg font-bold">Recent Transactions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {[
                    'Transaction ID',
                    'Student',
                    'Course',
                    'Amount',
                    'Commission',
                    'Instructor Earning',
                    'Method',
                    'Date',
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left text-xs font-bold tracking-wider text-slate-500 uppercase"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="transition-colors hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <span className="font-mono text-xs text-slate-400">{tx.id}</span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-semibold">{tx.student}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="line-clamp-1 max-w-xs text-xs text-slate-600">{tx.course}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-black text-[#0f172a]">
                        ৳{tx.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-secondary font-bold">৳{tx.commission}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-primary font-bold">
                        ৳{tx.instructorEarning.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-sm bg-slate-100 px-2.5 py-1 text-xs font-medium">
                        {tx.method}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-text-secondary text-xs">{tx.date}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenuePaymentsPage;
