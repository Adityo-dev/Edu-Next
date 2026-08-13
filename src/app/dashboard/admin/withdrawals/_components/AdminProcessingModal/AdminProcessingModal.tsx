'use client';

import { useProcessWithdrawalMutation } from '@/redux/features/withdrawal/withdrawal.api';
import { IWithdrawalRequest } from '@/types/withdrawal.types';
import { X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface AdminProcessingModalProps {
  isOpen: boolean;
  onClose: () => void;
  withdrawal: IWithdrawalRequest | null;
}

const AdminProcessingModal = ({ isOpen, onClose, withdrawal }: AdminProcessingModalProps) => {
  const [adminTransactionId, setAdminTransactionId] = useState('');
  const [adminNote, setAdminNote] = useState('');
  const [processWithdrawal, { isLoading }] = useProcessWithdrawalMutation();

  if (!isOpen || !withdrawal) return null;

  const handleProcess = async (action: 'approve' | 'reject') => {
    if (action === 'approve' && !adminTransactionId) {
      toast.error('Transaction ID is required for approval');
      return;
    }

    try {
      await processWithdrawal({
        id: withdrawal._id,
        data: { action, adminTransactionId, adminNote },
      }).unwrap();
      toast.success(`Withdrawal ${action}d successfully`);
      onClose();
      setAdminTransactionId('');
      setAdminNote('');
    } catch (err) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || `Failed to ${action} withdrawal`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-md bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">Process Withdrawal</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800">
            <X size={20} />
          </button>
        </div>

        <div className="mb-6 space-y-2 rounded-md bg-slate-50 p-4 text-sm">
          <p>
            <span className="font-medium text-slate-500">Instructor:</span>{' '}
            <span className="font-bold text-slate-800">
              {typeof withdrawal.instructor === 'object'
                ? withdrawal.instructor.fullName
                : 'Instructor'}
            </span>
          </p>
          <p>
            <span className="font-medium text-slate-500">Amount:</span>{' '}
            <span className="text-primary text-lg font-black">
              ৳{withdrawal.amount.toLocaleString()}
            </span>
          </p>
          <div className="pt-2">
            <span className="mb-1 block font-medium text-slate-500">Payout Details:</span>
            <div className="rounded border border-slate-200 bg-white p-2">
              {withdrawal.payoutDetails?.method === 'bank' ? (
                <>
                  <p>Bank: {withdrawal.payoutDetails.bankName}</p>
                  <p>Account: {withdrawal.payoutDetails.accountName}</p>
                  <p>A/C No: {withdrawal.payoutDetails.accountNumber}</p>
                  <p>Branch: {withdrawal.payoutDetails.branch}</p>
                  <p>Routing: {withdrawal.payoutDetails.routingNumber}</p>
                </>
              ) : withdrawal.payoutDetails?.method === 'bkash' ||
                withdrawal.payoutDetails?.method === 'nagad' ? (
                <p>
                  <span className="uppercase">{withdrawal.payoutDetails.method}</span>:{' '}
                  {withdrawal.payoutDetails.mobileNumber}
                </p>
              ) : (
                <p className="text-gray-500 italic">No payout details provided</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Admin Transaction ID (Required for Approval)
            </label>
            <input
              type="text"
              value={adminTransactionId}
              onChange={(e) => setAdminTransactionId(e.target.value)}
              className="focus:border-primary w-full rounded-md border border-slate-300 px-4 py-2 outline-none"
              placeholder="e.g. TrxID or Bank Ref"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Admin Note (Optional)
            </label>
            <textarea
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              className="focus:border-primary w-full rounded-md border border-slate-300 px-4 py-2 outline-none"
              placeholder="Any message for the instructor"
              rows={2}
            />
          </div>

          <div className="flex gap-4 pt-2">
            <button
              onClick={() => handleProcess('reject')}
              disabled={isLoading}
              className="w-full rounded-md border border-red-500 px-4 py-2 font-bold text-red-500 transition hover:bg-red-50 disabled:opacity-50"
            >
              Reject
            </button>
            <button
              onClick={() => handleProcess('approve')}
              disabled={isLoading || !adminTransactionId}
              className="bg-primary hover:bg-primary/90 w-full rounded-md px-4 py-2 font-bold text-white transition disabled:opacity-50"
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProcessingModal;
