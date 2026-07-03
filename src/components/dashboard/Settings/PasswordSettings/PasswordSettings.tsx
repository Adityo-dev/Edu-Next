/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import InputField from '@/components/dashboard/Fields/InputField/InputField';
import { useChangePasswordMutation } from '@/redux/features/settings/profileManagement/profileManagement.api';
import { zodResolver } from '@hookform/resolvers/zod';
import { RefreshCw, Save } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const passwordSchema = z
  .object({
    oldPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(6, 'New password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

const PasswordSettings = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);

  const { control, handleSubmit, reset } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: PasswordFormData) => {
    setApiError(null);
    setApiSuccess(null);
    try {
      const response = await changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }).unwrap();

      if (response.success) {
        setApiSuccess(response.message || 'Security password updated successfully.');
        reset();
      }
    } catch (error: any) {
      setApiError(error?.data?.message || error?.message || 'Failed to update password');
    }
  };

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Change Password</h2>

      <div className="min-h-12 empty:hidden">
        {apiError && (
          <div className="text-danger border-danger/20 bg-danger/5 mb-4 flex items-start gap-2 rounded-sm border p-3 text-sm font-medium">
            <span>⚠️</span> <span>{apiError}</span>
          </div>
        )}

        {apiSuccess && (
          <div className="text-success border-success/20 bg-success/5 mb-4 flex items-start gap-2 rounded-md border p-3 text-sm font-medium">
            <span>✅</span> <span>{apiSuccess}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Current Password"
          name="oldPassword"
          type="password"
          control={control}
          placeholder="Enter your current password"
          required
        />

        <InputField
          label="New Password"
          name="newPassword"
          type="password"
          control={control}
          placeholder="Enter your new password"
          required
        />

        <InputField
          label="Confirm New Password"
          name="confirmPassword"
          type="password"
          control={control}
          placeholder="Enter your new password again"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary mt-2 flex items-center gap-2 rounded-sm px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#2a6159] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? <RefreshCw size={15} className="animate-spin" /> : <Save size={15} />}
          {isLoading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
};

export default PasswordSettings;
