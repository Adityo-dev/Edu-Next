import { TPaymentItem } from '@/types/payment.types';
import { FormatDateTime } from '@/utils/formatDateTime';
import { ArrowDownLeft } from 'lucide-react';

interface TransactionHistoryProps {
  payments: TPaymentItem[];
}

const TransactionHistory = ({ payments }: TransactionHistoryProps) => {
  return (
    <div className="dashboard-card-container p-0">
      <div className="border-b border-slate-100 px-4 py-4 sm:px-6">
        <h2 className="text-lg font-semibold">Transaction History</h2>
      </div>
      <div className="divide-primary/8 divide-y">
        {payments.map((tx) => (
          <div
            key={tx._id}
            className="flex items-start justify-between gap-2 px-4 py-4 sm:items-center sm:gap-4 sm:px-6"
          >
            <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4">
              <div className="text-primary bg-primary/8 mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full sm:mt-0">
                <ArrowDownLeft size={18} />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold sm:line-clamp-2 sm:whitespace-normal">
                  Sale: {tx.course?.title || 'Course Sale'}
                </p>
                <div className="text-text-secondary mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                  <span>{FormatDateTime(tx.createdAt)}</span>
                  <span className="hidden sm:block">•</span>
                  <span>
                    {tx.commissionRate}% Commission (-৳{tx.commissionAmount?.toLocaleString() || 0})
                  </span>
                </div>
              </div>
            </div>
            <span className="text-primary mt-0.5 shrink-0 text-base font-bold sm:mt-0">
              +৳{tx.instructorEarning?.toLocaleString() || 0}
            </span>
          </div>
        ))}
        {payments.length === 0 && (
          <div className="px-4 py-8 text-center text-sm text-gray-500 sm:px-6">
            No transactions found.
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
