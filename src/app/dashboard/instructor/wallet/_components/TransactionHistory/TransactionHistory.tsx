'use client';

import CustomPagination from '@/components/dashboard/CustomPagination/CustomPagination';
import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import DynamicTableFilterBar from '@/components/dashboard/DynamicTableFilterBar/DynamicTableFilterBar';
import EmptyState from '@/components/dashboard/EmptyState/EmptyState';
import { useModal } from '@/context/ModalContext';
import { ICourse } from '@/types/courseManagement.types';
import { TPaymentItem } from '@/types/payment.types';
import { ITableFilter } from '@/types/table-filter.types';
import { FormatDateTime } from '@/utils/formatDateTime';
import { ArrowDownLeft, Receipt } from 'lucide-react';

interface TransactionHistoryProps {
  payments: TPaymentItem[];
  isLoading?: boolean;
  courses?: ICourse[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const TransactionHistory = ({
  payments,
  isLoading,
  courses = [],
  pagination,
}: TransactionHistoryProps) => {
  const { openModal } = useModal();

  const filterFields: ITableFilter[] = [
    {
      type: 'select',
      name: 'course-filter',
      placeholder: 'Filter by course',
      options: [
        { label: 'All Courses', value: 'all' },
        ...courses.map((c) => ({ label: c.title, value: c._id })),
      ],
    },
    {
      type: 'tabs',
      name: 'status-filter',
      placeholder: 'Status',
      options: [
        { label: 'All Statuses', value: 'all' },
        { label: 'Paid', value: 'paid' },
        { label: 'Refunded', value: 'refunded' },
      ],
    },
  ];

  return (
    <div className="dashboard-card-container p-0">
      {/* Header + Filter */}
      <div className="flex flex-col gap-4 border-b border-slate-100 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="shrink-0 text-lg font-semibold">Transaction History</h2>
        <div className="w-full lg:w-auto">
          <DynamicTableFilterBar fields={filterFields} />
        </div>
      </div>

      {/* Transactions */}
      <div className="divide-primary/8 divide-y">
        {isLoading ? (
          [...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between gap-4 px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 animate-pulse rounded-full bg-slate-200" />
                <div className="space-y-2">
                  <div className="h-4 w-48 animate-pulse rounded bg-slate-200" />
                  <div className="h-3 w-32 animate-pulse rounded bg-slate-200" />
                </div>
              </div>
              <div className="h-5 w-20 animate-pulse rounded bg-slate-200" />
            </div>
          ))
        ) : payments.length === 0 ? (
          <EmptyState
            icon={Receipt}
            title="No Transactions Found"
            description="No transaction records match your current filter. Try selecting a different course."
          />
        ) : (
          payments.map((tx) => {
            const isRefunded = tx.status === 'refunded';
            return (
              <div
                key={tx._id}
                className="flex items-start justify-between gap-2 px-4 py-4 sm:items-center sm:gap-4"
              >
                <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4">
                  <div
                    className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full sm:mt-0 ${
                      isRefunded ? 'text-danger bg-red-50' : 'text-primary bg-primary/8'
                    }`}
                  >
                    <ArrowDownLeft size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate text-sm font-semibold sm:line-clamp-2 sm:whitespace-normal">
                        Sale: {tx.course?.title || 'Course Sale'}
                      </p>
                      {isRefunded && <DynamicBadge text="Refunded" color="#dc3545" />}
                    </div>
                    <div className="text-text-secondary mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                      <span>{FormatDateTime(tx.createdAt)}</span>
                      <span className="hidden sm:block">•</span>
                      <span>
                        {tx.commissionRate}% Commission (-৳
                        {tx.commissionAmount?.toLocaleString() || 0})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-1.5 sm:flex-row sm:items-center sm:gap-3">
                  <span
                    className={`text-base font-semibold ${
                      isRefunded ? 'text-danger line-through' : 'text-primary'
                    }`}
                  >
                    +৳{tx.instructorEarning?.toLocaleString() || 0}
                  </span>

                  {isRefunded && tx.refund?.status === 'refunded' && (
                    <DynamicActionButton
                      label="View Details"
                      onClick={() =>
                        openModal({
                          view: 'REFUND_DETAILS',
                          data: tx,
                          title: 'Refund Details',
                          description: 'Full breakdown of the refund for this transaction.',
                        })
                      }
                      className="h-10! px-4"
                    />
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && !isLoading && (
        <div className="border-t border-slate-100 px-4 py-3">
          <CustomPagination meta={pagination} />
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
