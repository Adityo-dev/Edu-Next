/* eslint-disable react-hooks/incompatible-library */
'use client';

import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import InputField from '@/components/dashboard/Fields/InputField/InputField';
import {
  useGetPayoutSettingsQuery,
  useRequestWithdrawalMutation,
} from '@/redux/features/withdrawal/withdrawal.api';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface WithdrawalFormProps {
  balance: number;
  minWithdrawal: number;
}

const formSchema = z.object({
  method: z.enum(['bKash', 'Nagad', 'Bank']),
  amount: z.string().min(1, 'Amount is required'),
  account: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const WithdrawalForm = ({ balance, minWithdrawal }: WithdrawalFormProps) => {
  const { data: payoutSettingsData } = useGetPayoutSettingsQuery();
  const [requestWithdrawal, { isLoading }] = useRequestWithdrawalMutation();

  const { control, handleSubmit, setValue, watch } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      method: 'bKash',
      amount: '',
      account: '',
    },
  });

  const method = watch('method');
  const amount = watch('amount');
  const account = watch('account');

  // Update account when method or payout settings change
  useEffect(() => {
    const settings = payoutSettingsData?.data;
    if (method.toLowerCase() === 'bKash'.toLowerCase()) {
      setValue('account', settings?.bkash?.mobileNumber || '');
    } else if (method.toLowerCase() === 'Nagad'.toLowerCase()) {
      setValue('account', settings?.nagad?.mobileNumber || '');
    } else if (method.toLowerCase() === 'Bank'.toLowerCase()) {
      setValue('account', settings?.bank?.accountNumber || '');
    }
  }, [method, payoutSettingsData, setValue]);

  const onSubmit = async (data: FormValues) => {
    const numericAmount = Number(data.amount);
    if (!numericAmount || numericAmount < minWithdrawal || numericAmount > balance) return;

    try {
      await requestWithdrawal({
        amount: numericAmount,
        method: data.method.toLowerCase() as 'bank' | 'bkash' | 'nagad',
      }).unwrap();
      toast.success('Withdrawal request submitted successfully');
      setValue('amount', '');
    } catch (err) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || 'Failed to submit withdrawal request');
    }
  };

  const isSubmitDisabled =
    !amount || !account || parseInt(amount) > balance || parseInt(amount) < minWithdrawal;

  let amountError = '';
  if (amount && parseInt(amount) > balance) amountError = 'Amount exceeds available balance.';
  else if (amount && parseInt(amount) < minWithdrawal)
    amountError = `Minimum withdrawal is ৳${minWithdrawal}.`;

  return (
    <div className="dashboard-card-container">
      <h2 className="mb-5 text-lg font-semibold">New Withdrawal Request</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Method */}
        <div>
          <label className="mb-2 block text-xs font-bold tracking-wider text-slate-500 uppercase">
            Payment Method
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['bKash', 'Nagad', 'Bank'] as const).map((m) => (
              <button
                type="button"
                key={m}
                onClick={() => setValue('method', m)}
                className={`cursor-pointer rounded-sm border py-3 text-sm font-bold transition-all ${
                  method === m
                    ? 'border-primary text-primary bg-emerald-50'
                    : 'border-slate-200 text-slate-500 hover:border-slate-300'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Account */}
        <div className="space-y-1">
          <InputField
            name="account"
            control={control}
            label={method === 'Bank' ? 'Bank Account Number' : `${method} Number`}
            placeholder={method === 'Bank' ? 'Account number not set' : `${method} number not set`}
            readOnly
          />
          <p className="text-text-secondary text-[11px]">
            You can update your payout details from your{' '}
            <Link
              href="/dashboard/instructor/profile"
              className="text-primary font-medium underline"
            >
              Profile Settings
            </Link>
            .
          </p>
        </div>

        {/* Amount */}
        <InputField
          name="amount"
          control={control}
          type="number"
          label="Amount (BDT)"
          placeholder={`Min. ৳${minWithdrawal}`}
          error={amountError}
        />

        {/* Quick Amounts */}
        <div>
          <label className="mb-2 block text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Quick Select
          </label>
          <div className="flex gap-2">
            {[1000, 3000, 5000, 10000].map((q) => (
              <button
                type="button"
                key={q}
                onClick={() => setValue('amount', String(q))}
                className={`flex-1 cursor-pointer rounded-sm border py-2 text-xs font-bold transition-all ${
                  amount === String(q)
                    ? 'border-primary text-primary bg-emerald-50'
                    : 'border-slate-200 text-slate-500 hover:border-slate-300'
                }`}
              >
                ৳{q.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-sm border border-emerald-100 bg-emerald-50 p-3 text-xs leading-relaxed text-slate-600">
          ✅ Withdrawals are processed within <span className="font-bold">1-2 business days</span>{' '}
          after admin approval.
        </div>

        <DynamicActionButton
          type="submit"
          label="Submit Withdrawal Request"
          disabled={isSubmitDisabled}
          isLoading={isLoading}
          className="w-full"
        />
      </form>
    </div>
  );
};

export default WithdrawalForm;
