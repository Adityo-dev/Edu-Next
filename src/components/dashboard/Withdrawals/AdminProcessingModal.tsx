'use client';

import { useModal } from '@/context/ModalContext';
import { useProcessWithdrawalMutation } from '@/redux/features/withdrawal/withdrawal.api';
import { IWithdrawalRequest } from '@/types/withdrawal.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import DynamicActionButton from '../DynamicActionButton/DynamicActionButton';
import InputField from '../Fields/InputField/InputField';
import TextAreaField from '../Fields/TextAreaField/TextAreaField';

const withdrawalSchema = z.object({
  adminTransactionId: z.string().optional(),
  adminNote: z.string().optional(),
});

type WithdrawalFormValues = z.infer<typeof withdrawalSchema>;

const AdminProcessingModal = () => {
  const { data, closeModal } = useModal();
  const withdrawal = data?.withdrawal as IWithdrawalRequest;
  const action = data?.action as 'approve' | 'reject';

  const { control, handleSubmit } = useForm<WithdrawalFormValues>({
    resolver: zodResolver(withdrawalSchema),
    defaultValues: {
      adminTransactionId: '',
      adminNote: '',
    },
  });

  const [processWithdrawal, { isLoading }] = useProcessWithdrawalMutation();

  if (!withdrawal) return null;

  const onSubmit = async (values: WithdrawalFormValues) => {
    if (action === 'approve' && !values.adminTransactionId) {
      toast.error('Transaction ID is required for approval');
      return;
    }

    try {
      await processWithdrawal({
        id: withdrawal?._id,
        data: {
          action,
          adminTransactionId: values.adminTransactionId,
          adminNote: values.adminNote,
        },
      }).unwrap();
      toast.success(`Withdrawal ${action}d successfully`);
      closeModal();
    } catch (err) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || `Failed to ${action} withdrawal`);
    }
  };

  return (
    <div>
      <div className="mb-6 space-y-2 rounded-md bg-slate-50 p-4 text-sm">
        <p>
          <span className="font-medium text-slate-500">Instructor:</span>{' '}
          <span className="text-text-primary font-semibold">
            {typeof withdrawal?.instructor === 'object'
              ? withdrawal?.instructor.fullName
              : 'Instructor'}
          </span>
        </p>
        <p>
          <span className="font-medium text-slate-500">Amount:</span>{' '}
          <span className="text-primary text-lg font-bold">
            ৳{withdrawal?.amount.toLocaleString()}
          </span>
        </p>
        <div className="pt-2">
          <span className="mb-1 block font-medium text-slate-500">Payout Details:</span>
          <div className="rounded border border-slate-200 bg-white p-2">
            {withdrawal?.payoutDetails?.method === 'bank' ? (
              <>
                <p>Bank: {withdrawal?.payoutDetails.bankName}</p>
                <p>Account: {withdrawal?.payoutDetails.accountName}</p>
                <p>A/C No: {withdrawal?.payoutDetails.accountNumber}</p>
                <p>Branch: {withdrawal?.payoutDetails.branch}</p>
                <p>Routing: {withdrawal?.payoutDetails.routingNumber}</p>
              </>
            ) : withdrawal?.payoutDetails?.method === 'bkash' ||
              withdrawal?.payoutDetails?.method === 'nagad' ? (
              <p>
                <span className="uppercase">{withdrawal?.payoutDetails.method}</span>:{' '}
                {withdrawal?.payoutDetails.mobileNumber}
              </p>
            ) : (
              <p className="text-gray-500 italic">No payout details provided</p>
            )}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {action === 'approve' && (
          <InputField
            name="adminTransactionId"
            control={control}
            label="Transaction ID *"
            placeholder="e.g. TrxID or Bank Ref"
          />
        )}
        <TextAreaField
          name="adminNote"
          control={control}
          label="Admin Note (Optional)"
          placeholder="Any message for the instructor"
        />

        <div className="flex gap-4">
          <DynamicActionButton
            label="Cancel"
            onClick={closeModal}
            variant="outline"
            className="flex-1"
          />
          <DynamicActionButton
            type="submit"
            disabled={isLoading}
            label={isLoading ? 'Processing...' : action === 'approve' ? 'Approve' : 'Reject'}
            variant={action === 'approve' ? 'default' : 'danger'}
            className="flex-1"
          />
        </div>
      </form>
    </div>
  );
};

export default AdminProcessingModal;
