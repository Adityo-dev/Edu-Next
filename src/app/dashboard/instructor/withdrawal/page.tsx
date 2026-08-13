'use client';

import SectionHeader from '@/components/dashboard/SectionHeader/SectionHeader';
import { useGetInstructorEarningsQuery } from '@/redux/features/payment/paymentApi';
import WithdrawalBalance from './_components/WithdrawalBalance/WithdrawalBalance';
import WithdrawalForm from './_components/WithdrawalForm/WithdrawalForm';
import WithdrawalHistory from './_components/WithdrawalHistory/WithdrawalHistory';

const WithdrawalPage = () => {
  const { data: earningsData } = useGetInstructorEarningsQuery();

  const balance = earningsData?.data?.available || 0;
  const minWithdrawal = 500;

  return (
    <div className="space-y-6">
      <SectionHeader title="Withdrawal" description="Request your earnings withdrawal." />

      <WithdrawalBalance balance={balance} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <WithdrawalForm balance={balance} minWithdrawal={minWithdrawal} />

        <WithdrawalHistory />
      </div>
    </div>
  );
};

export default WithdrawalPage;
