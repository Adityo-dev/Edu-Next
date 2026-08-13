'use client';

import WithdrawalsList from './_components/WithdrawalsList/WithdrawalsList';
import WithdrawalsStats from './_components/WithdrawalsStats/WithdrawalsStats';
import SectionHeader from '@/components/dashboard/SectionHeader/SectionHeader';

const WithdrawalRequestsPage = () => {
  return (
    <section className="mx-auto space-y-6">
      <SectionHeader
        title="Withdrawal Requests"
        description="Review and process instructor withdrawal requests."
      />

      <WithdrawalsStats />
      <WithdrawalsList />
    </section>
  );
};

export default WithdrawalRequestsPage;
