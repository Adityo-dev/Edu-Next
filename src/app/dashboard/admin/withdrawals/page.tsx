'use client';

import { useState } from 'react';
import WithdrawalsFilter from './_components/WithdrawalsFilter/WithdrawalsFilter';
import WithdrawalsList from './_components/WithdrawalsList/WithdrawalsList';
import WithdrawalsStats from './_components/WithdrawalsStats/WithdrawalsStats';

import CustomPagination from '@/components/dashboard/CustomPagination/CustomPagination';
import SectionHeader from '@/components/dashboard/SectionHeader/SectionHeader';
import { useGetPendingWithdrawalsQuery } from '@/redux/features/withdrawal/withdrawal.api';
import { useSearchParams } from 'next/navigation';

const WithdrawalRequestsPage = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const [filter, setFilter] = useState('all');

  const { data, isLoading } = useGetPendingWithdrawalsQuery({
    page,
    limit: 10,
    ...(filter !== 'all' && { status: filter }),
  });

  const withdrawals = data?.data?.withdrawals || [];
  const stats = data?.data?.stats;
  const pagination = data?.data?.pagination;

  return (
    <section className="mx-auto space-y-6">
      <SectionHeader
        title="Withdrawal Requests"
        description="Review and process instructor withdrawal requests."
      />

      <WithdrawalsStats stats={stats} isLoading={isLoading} />
      <WithdrawalsFilter filter={filter} onFilterChange={setFilter} />

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-md bg-slate-200"></div>
          ))}
        </div>
      ) : withdrawals.length === 0 ? (
        <div className="flex h-32 items-center justify-center rounded-md border border-dashed border-slate-300">
          <p className="text-sm text-slate-500">No withdrawal requests found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <WithdrawalsList withdrawals={withdrawals} />
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
    </section>
  );
};

export default WithdrawalRequestsPage;
