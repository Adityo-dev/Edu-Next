'use client';

import SectionHeader from '@/components/dashboard/SectionHeader/SectionHeader';
import { useState } from 'react';
import WithdrawalBalance from './_components/WithdrawalBalance/WithdrawalBalance';
import WithdrawalForm from './_components/WithdrawalForm/WithdrawalForm';
import WithdrawalHistory from './_components/WithdrawalHistory/WithdrawalHistory';

const WithdrawalPage = () => {
  const [method, setMethod] = useState('bKash');
  const [amount, setAmount] = useState('');
  const [account, setAccount] = useState('');

  const balance = 12300;
  const minWithdrawal = 500;

  return (
    <div className="space-y-6">
      <SectionHeader title="Withdrawal" description="Request your earnings withdrawal." />

      <WithdrawalBalance balance={balance} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <WithdrawalForm
          method={method}
          setMethod={setMethod}
          amount={amount}
          setAmount={setAmount}
          account={account}
          setAccount={setAccount}
          balance={balance}
          minWithdrawal={minWithdrawal}
        />

        <WithdrawalHistory />
      </div>
    </div>
  );
};

export default WithdrawalPage;
