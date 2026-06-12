'use client';

import { useState } from 'react';
import WithdrawalsFilter from './_components/WithdrawalsFilter/WithdrawalsFilter';
import WithdrawalsList from './_components/WithdrawalsList/WithdrawalsList';
import WithdrawalsStats from './_components/WithdrawalsStats/WithdrawalsStats';

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

const WithdrawalRequestsPage = () => {
  const [filter, setFilter] = useState('all');

  const filtered = withdrawalsData.filter((w) => filter === 'all' || w.status === filter);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        <div>
          <h1 className="text-text-primary text-2xl font-black">Withdrawal Requests</h1>
          <p className="text-text-secondary mt-1 text-sm">
            Review and process instructor withdrawal requests.
          </p>
        </div>
        <WithdrawalsStats withdrawals={withdrawalsData} />
        <WithdrawalsFilter filter={filter} onFilterChange={setFilter} />
        <WithdrawalsList withdrawals={filtered} />
      </div>
    </div>
  );
};

export default WithdrawalRequestsPage;
