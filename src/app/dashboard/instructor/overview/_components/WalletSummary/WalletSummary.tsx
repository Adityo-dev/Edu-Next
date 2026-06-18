import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import { Wallet } from 'lucide-react';

const WalletSummary = () => {
  return (
    <div className="bg-primary rounded-md p-5 shadow-xs">
      <div className="mb-3 flex items-center justify-between">
        <Wallet size={22} className="text-white/80" />
        <span className="text-xs text-white">Available Balance</span>
      </div>
      <p className="mb-1 text-3xl font-black text-white">৳12,300</p>
      <p className="mb-4 text-xs text-white">Last withdrawal: ৳8,000 on Apr 1</p>
      <DynamicActionButton
        label="Withdrawal Request"
        className="bg-secondary hover:bg-secondary/90 w-full"
      />
    </div>
  );
};

export default WalletSummary;
