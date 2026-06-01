'use client';

import WalletCard from './_components/WalletCard/WalletCard';
import WalletStats from './_components/WalletStats/WalletStats';
import TransactionHistory from './_components/TransactionHistory/TransactionHistory';

const transactions = [
  { id: 1, type: 'credit', amount: 1200 },
  { id: 2, type: 'credit', amount: 1440 },
  { id: 3, type: 'debit', amount: 8000 },
  { id: 4, type: 'credit', amount: 1200 },
  { id: 5, type: 'credit', amount: 720 },
  { id: 6, type: 'credit', amount: 1440 },
  { id: 7, type: 'debit', amount: 5000 },
];

const InstructorWalletPage = () => {
  const credits = transactions.filter((t) => t.type === 'credit').reduce((a, b) => a + b.amount, 0);
  const debits = transactions.filter((t) => t.type === 'debit').reduce((a, b) => a + b.amount, 0);
  const balance = credits - debits;

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        <div>
          <h1 className="text-text-primary text-2xl font-black">My Wallet</h1>
          <p className="text-text-secondary mt-1 text-sm">
            Track your earnings and transaction history.
          </p>
        </div>

        <WalletCard balance={balance} />

        <WalletStats credits={credits} debits={debits} />

        <TransactionHistory />
      </div>
    </div>
  );
};

export default InstructorWalletPage;
