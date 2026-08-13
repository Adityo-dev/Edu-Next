import CustomPagination from '@/components/dashboard/CustomPagination/CustomPagination';
import { useGetMyWithdrawalsQuery } from '@/redux/features/withdrawal/withdrawal.api';
import { useSearchParams } from 'next/navigation';

import WithdrawalHistoryCard from './_components/WithdrawalHistoryCard/WithdrawalHistoryCard';

const WithdrawalHistory = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const { data, isLoading } = useGetMyWithdrawalsQuery({ page, limit: 10 });
  const withdrawals = data?.data?.withdrawals || [];
  const pagination = data?.data?.pagination;

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
        <div className="space-y-4">
          <div className="space-y-3">
            {withdrawals.map((wd) => (
              <WithdrawalHistoryCard key={wd._id} wd={wd} />
            ))}
          </div>
          {pagination && (
            <div className="mt-4">
              <CustomPagination
                meta={{
                  total: pagination?.total || 0,
                  page: pagination?.page || 1,
                  limit: pagination?.limit || 10,
                  totalPages: pagination?.totalPages || 1,
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WithdrawalHistory;
