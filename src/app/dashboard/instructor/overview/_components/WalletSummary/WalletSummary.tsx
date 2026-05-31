import React from 'react';
import Link from 'next/link';
import { Wallet } from 'lucide-react';

const WalletSummary = () => {
  return (
    <div className="bg-primary rounded-md p-5 shadow-xs">
      <div className="mb-3 flex items-center justify-between">
        <Wallet size={20} className="text-white/70" />
        <span className="text-xs text-white/50">Available Balance</span>
      </div>
      <p className="mb-1 text-3xl font-black text-white">৳12,300</p>
      <p className="mb-4 text-xs text-white/60">Last withdrawal: ৳8,000 on Apr 1</p>
      <Link
        href="/dashboard/instructor/withdrawal"
        className="bg-secondary block rounded-sm py-2.5 text-center text-sm font-bold text-white transition-all hover:bg-[#d98c0a]"
      >
        Request Withdrawal
      </Link>
    </div>
  );
};

export default WalletSummary;
