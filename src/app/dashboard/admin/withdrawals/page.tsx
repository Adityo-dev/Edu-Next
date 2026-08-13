'use client';

import { useGetPendingWithdrawalsQuery } from '@/redux/features/withdrawal/withdrawal.api';
import WithdrawalsList from './_components/WithdrawalsList/WithdrawalsList';

const WithdrawalRequestsPage = () => {
  const { data, isLoading } = useGetPendingWithdrawalsQuery();
  const withdrawals = data?.data || [];

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        <div>
          <h1 className="text-text-primary text-2xl font-black">Withdrawal Requests</h1>
          <p className="text-text-secondary mt-1 text-sm">
            Review and process pending instructor withdrawal requests.
          </p>
        </div>

        {/* Keeping stats hidden or static for now since the API only returns pending, unless we want to show it. Actually we can just show the list for now. */}

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 animate-pulse rounded-md bg-slate-200"></div>
            ))}
          </div>
        ) : withdrawals.length === 0 ? (
          <div className="flex h-32 items-center justify-center rounded-md border border-dashed border-slate-300">
            <p className="text-sm text-slate-500">No pending withdrawal requests found.</p>
          </div>
        ) : (
          <WithdrawalsList withdrawals={withdrawals} />
        )}
      </div>
    </div>
  );
};

export default WithdrawalRequestsPage;
