import { ArrowUpRight, Wallet } from 'lucide-react';
import Link from 'next/link';

interface WalletCardProps {
  balance: number;
}

const WalletCard = ({ balance }: WalletCardProps) => {
  return (
    <div className="bg-primary dashboard-card-container p-6">
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
          <p className="py-2 text-5xl font-black text-white">৳{balance.toLocaleString()}</p>
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
  );
};

export default WalletCard;
