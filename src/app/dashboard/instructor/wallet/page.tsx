'use client';

import SectionHeader from '@/components/dashboard/SectionHeader/SectionHeader';
import { useGetInstructorEarningsQuery } from '@/redux/features/payment/paymentApi';
import TransactionHistory from './_components/TransactionHistory/TransactionHistory';
import WalletCard from './_components/WalletCard/WalletCard';
import WalletStats from './_components/WalletStats/WalletStats';

const InstructorWalletPage = () => {
  const { data: response, isLoading } = useGetInstructorEarningsQuery();

  if (isLoading) {
    return (
      <div className="flex h-100 items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
      </div>
    );
  }

  const earnings = response?.data;

  return (
    <div className="space-y-6">
      <SectionHeader title="My Wallet" description="Track your earnings and transaction history." />

      <WalletCard balance={earnings?.available || 0} />

      <WalletStats
        totalEarned={earnings?.totalEarned || 0}
        withdrawn={earnings?.withdrawn || 0}
        pendingWithdrawal={earnings?.pendingWithdrawal || 0}
      />

      <TransactionHistory payments={earnings?.payments || []} />
    </div>
  );
};

export default InstructorWalletPage;
