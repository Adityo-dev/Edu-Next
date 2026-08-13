import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import { IWithdrawalRequest } from '@/types/withdrawal.types';
import { Clock } from 'lucide-react';
import { useState } from 'react';
import AdminProcessingModal from '../AdminProcessingModal/AdminProcessingModal';

interface WithdrawalsListProps {
  withdrawals: IWithdrawalRequest[];
}

const WithdrawalsList = ({ withdrawals }: WithdrawalsListProps) => {
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<IWithdrawalRequest | null>(null);

  return (
    <div className="space-y-3">
      {withdrawals.map((wd) => (
        <div
          key={wd._id}
          className={`dashboard-card-container p-3 shadow-none ${wd.status === 'pending' ? 'border-warning/30' : wd.status === 'rejected' ? 'border-danger/30' : 'border-primary/30'}`}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-4">
              <div className="bg-primary/10 text-primary flex h-11 w-11 items-center justify-center rounded-full font-bold">
                {typeof wd.instructor === 'object' ? wd.instructor.fullName.charAt(0) : 'I'}
              </div>
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <h3 className="font-bold">
                    {typeof wd.instructor === 'object' ? wd.instructor.fullName : 'Instructor'}
                  </h3>
                  <DynamicBadge
                    text={wd?.status}
                    color={`${wd.status === 'pending' ? '#ffc107' : wd.status === 'rejected' ? '#dc3545' : '#34796f'}`}
                  />
                </div>
                <div className="text-text-secondary flex flex-wrap items-center gap-3 text-xs">
                  <span className="font-semibold uppercase">
                    {wd.payoutDetails?.method || 'Unknown'}
                  </span>
                  <span>•</span>
                  <span>
                    <Clock size={11} className="mr-1 inline" />
                    {new Date(wd.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-4">
              <div className="text-right">
                <p className="text-text-primary text-xl font-semibold">
                  ৳{wd.amount.toLocaleString()}
                </p>
              </div>
              {wd.status === 'pending' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedWithdrawal(wd)}
                    className="bg-primary hover:bg-primary/90 rounded-sm px-4 py-2 text-xs font-bold text-white transition"
                  >
                    Process
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      <AdminProcessingModal
        isOpen={!!selectedWithdrawal}
        onClose={() => setSelectedWithdrawal(null)}
        withdrawal={selectedWithdrawal}
      />
    </div>
  );
};

export default WithdrawalsList;
