import { useGetMyWithdrawalsQuery } from '@/redux/features/withdrawal/withdrawal.api';

import WithdrawalHistoryCard from './_components/WithdrawalHistoryCard/WithdrawalHistoryCard';

const WithdrawalHistory = () => {
  const { data, isLoading } = useGetMyWithdrawalsQuery();
  const withdrawals = data?.data || [];

  return (
    <div className="dashboard-card-container">
      <h2 className="mb-5 text-lg font-semibold">Withdrawal History</h2>
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-md bg-slate-100"></div>
          ))}
        </div>
      ) : withdrawals.length === 0 ? (
        <div className="flex h-32 items-center justify-center rounded-md border border-dashed border-slate-200">
          <p className="text-sm text-slate-500">No withdrawals found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {withdrawals.map((wd) => (
            <WithdrawalHistoryCard key={wd._id} wd={wd} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WithdrawalHistory;
