import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import { Wallet } from 'lucide-react';

const WalletSummary = () => {
  return (
    <div className="bg-primary rounded-md p-5 shadow-xs">
      <div className="mb-3 flex items-center justify-between">
        <Wallet size={22} className="text-white/70" />
        <span className="text-xs text-white/50">Available Balance</span>
      </div>
      <p className="mb-1 text-3xl font-black text-white">৳12,300</p>
      <p className="mb-4 text-xs text-white/60">Last withdrawal: ৳8,000 on Apr 1</p>
      <DynamicActionButton label="Withdrawal Request" className="bg-secondary w-full" />
    </div>
  );
};

export default WalletSummary;
