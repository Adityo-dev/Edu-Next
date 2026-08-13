/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import InputField from '@/components/dashboard/Fields/InputField/InputField';
import {
  useGetPayoutSettingsQuery,
  useUpdatePayoutSettingsMutation,
} from '@/redux/features/withdrawal/withdrawal.api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const payoutSettingsSchema = z
  .object({
    bankName: z.string().optional(),
    accountName: z.string().optional(),
    accountNumber: z.string().optional(),
    branch: z.string().optional(),
    routingNumber: z.string().optional(),
    bkashNumber: z.string().optional(),
    nagadNumber: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // If any bank field is filled, make sure all bank fields are filled
    const bankFields = [
      data.bankName,
      data.accountName,
      data.accountNumber,
      data.branch,
      data.routingNumber,
    ];
    const hasAnyBankField = bankFields.some((f) => !!f);
    const hasAllBankFields = bankFields.every((f) => !!f);

    if (hasAnyBankField && !hasAllBankFields) {
      if (!data.bankName)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Bank Name is required',
          path: ['bankName'],
        });
      if (!data.accountName)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Account Name is required',
          path: ['accountName'],
        });
      if (!data.accountNumber)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Account Number is required',
          path: ['accountNumber'],
        });
      if (!data.branch)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Branch Name is required',
          path: ['branch'],
        });
      if (!data.routingNumber)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Routing Number is required',
          path: ['routingNumber'],
        });
    }
  });

type PayoutSettingsFormValues = z.infer<typeof payoutSettingsSchema>;

const PayoutSettings = () => {
  const { data, isLoading } = useGetPayoutSettingsQuery();
  const [updateSettings, { isLoading: isUpdating }] = useUpdatePayoutSettingsMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PayoutSettingsFormValues>({
    resolver: zodResolver(payoutSettingsSchema),
    defaultValues: {
      bankName: '',
      accountName: '',
      accountNumber: '',
      branch: '',
      routingNumber: '',
      bkashNumber: '',
      nagadNumber: '',
    },
  });

  useEffect(() => {
    if (data?.data) {
      reset({
        bankName: data.data.bank?.bankName || '',
        accountName: data.data.bank?.accountName || '',
        accountNumber: data.data.bank?.accountNumber || '',
        branch: data.data.bank?.branch || '',
        routingNumber: data.data.bank?.routingNumber || '',
        bkashNumber: data.data.bkash?.mobileNumber || '',
        nagadNumber: data.data.nagad?.mobileNumber || '',
      });
    }
  }, [data, reset]);

  const onSubmit = async (values: PayoutSettingsFormValues) => {
    const payload: any = {};

    if (
      values.bankName &&
      values.accountName &&
      values.accountNumber &&
      values.branch &&
      values.routingNumber
    ) {
      payload.bank = {
        bankName: values.bankName,
        accountName: values.accountName,
        accountNumber: values.accountNumber,
        branch: values.branch,
        routingNumber: values.routingNumber,
      };
    }

    if (values.bkashNumber) {
      payload.bkash = { mobileNumber: values.bkashNumber };
    }

    if (values.nagadNumber) {
      payload.nagad = { mobileNumber: values.nagadNumber };
    }

    try {
      await updateSettings(payload).unwrap();
      toast.success('Payout settings saved successfully!');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to save payout settings');
    }
  };

  if (isLoading) {
    return (
      <div className="flex animate-pulse flex-col space-y-4">
        <div className="h-6 w-1/3 rounded-md bg-slate-200" />
        <div className="h-10 w-full rounded-md bg-slate-200" />
        <div className="h-10 w-full rounded-md bg-slate-200" />
        <div className="h-10 w-32 rounded-md bg-slate-200" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold">Payout Settings</h2>
        <p className="text-sm text-slate-500">Configure how you want to receive your earnings.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Bank Details Section */}
        <div>
          <h3 className="mb-4 border-b pb-2 text-base font-bold text-slate-800">
            Bank Transfer Details
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputField
              name="bankName"
              label="Bank Name"
              control={control}
              placeholder="e.g. City Bank"
              error={errors.bankName?.message}
            />
            <InputField
              name="accountName"
              label="Account Name"
              control={control}
              placeholder="John Doe"
              error={errors.accountName?.message}
            />
            <InputField
              name="accountNumber"
              label="Account Number"
              control={control}
              placeholder="123456789"
              error={errors.accountNumber?.message}
            />
            <InputField
              name="branch"
              label="Branch Name"
              control={control}
              placeholder="e.g. Gulshan"
              error={errors.branch?.message}
            />
            <InputField
              name="routingNumber"
              label="Routing Number"
              control={control}
              placeholder="12345678"
              error={errors.routingNumber?.message}
            />
          </div>
        </div>

        {/* bKash Details Section */}
        <div>
          <h3 className="mb-4 border-b pb-2 text-base font-bold text-slate-800">bKash Details</h3>
          <InputField
            name="bkashNumber"
            label="bKash Mobile Number"
            control={control}
            placeholder="01XXXXXXXXX"
            error={errors.bkashNumber?.message}
          />
        </div>

        {/* Nagad Details Section */}
        <div>
          <h3 className="mb-4 border-b pb-2 text-base font-bold text-slate-800">Nagad Details</h3>
          <InputField
            name="nagadNumber"
            label="Nagad Mobile Number"
            control={control}
            placeholder="01XXXXXXXXX"
            error={errors.nagadNumber?.message}
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isUpdating}
            className="bg-primary hover:bg-primary/90 rounded-md px-6 py-2 font-medium text-white transition disabled:opacity-50"
          >
            {isUpdating ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PayoutSettings;
