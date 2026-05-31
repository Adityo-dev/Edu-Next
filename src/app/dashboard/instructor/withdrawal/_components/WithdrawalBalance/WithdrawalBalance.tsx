import React from 'react';
import { Wallet } from 'lucide-react';

interface WithdrawalBalanceProps {
  balance: number;
}

const WithdrawalBalance = ({ balance }: WithdrawalBalanceProps) => {
  return (
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
  );
};

export default WithdrawalBalance;
