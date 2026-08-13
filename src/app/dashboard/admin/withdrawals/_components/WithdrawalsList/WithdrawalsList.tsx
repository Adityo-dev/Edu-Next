/* eslint-disable @typescript-eslint/no-explicit-any */
import DynamicTableActions from '@/components/dashboard/DynamicTableActions/DynamicTableActions';
import { useModal } from '@/context/ModalContext';
import { IWithdrawalRequest } from '@/types/withdrawal.types';
import { Clock, Wallet } from 'lucide-react';

interface WithdrawalsListProps {
  withdrawals: IWithdrawalRequest[];
}

const WithdrawalsList = ({ withdrawals }: WithdrawalsListProps) => {
  const { openModal } = useModal();

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
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      wd.status === 'pending'
                        ? 'bg-warning/10 text-warning'
                        : wd.status === 'rejected'
                          ? 'bg-danger/10 text-danger'
                          : 'bg-primary/10 text-primary'
                    }`}
                  >
                    {wd.status.charAt(0).toUpperCase() + wd.status.slice(1)}
                  </span>
                </div>
                <div className="text-text-secondary flex flex-wrap items-center gap-3 text-xs">
                  <span className="flex items-center gap-1">
                    <Wallet size={11} /> Wallet: ৳
                    {(typeof wd.instructor === 'object'
                      ? (wd.instructor as any).walletBalance
                      : 0) || 0}
                  </span>
                  <span>•</span>
                  <span className="font-semibold uppercase">
                    {wd.payoutDetails?.method || 'Unknown'}:{' '}
                    {wd.payoutDetails?.mobileNumber || wd.payoutDetails?.accountNumber || 'N/A'}
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
                <p className="text-text-secondary text-xs">{wd._id.slice(-6).toUpperCase()}</p>
              </div>
              {wd.status === 'pending' && (
                <div className="flex gap-2">
                  <DynamicTableActions
                    actions={[
                      {
                        type: 'message',
                        label: 'Approve',
                        onClick: () =>
                          openModal({
                            view: 'WITHDRAWAL_PROCESSING',
                            title: 'Process Withdrawal',
                            data: { withdrawal: wd, action: 'approve' },
                          }),
                      },
                      {
                        type: 'suspend',
                        label: 'Reject',
                        onClick: () =>
                          openModal({
                            view: 'WITHDRAWAL_PROCESSING',
                            title: 'Process Withdrawal',
                            data: { withdrawal: wd, action: 'reject' },
                          }),
                      },
                    ]}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WithdrawalsList;
