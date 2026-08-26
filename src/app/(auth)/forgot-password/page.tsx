/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import InputField from '@/components/dashboard/Fields/InputField/InputField';
import { baseApi } from '@/services/root/baseApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, LockKeyhole, Send } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const forgotSchema = z.object({
  email: z.string().min(1, 'Email is required.').email('Please enter a valid email address.'),
});

type ForgotFormData = z.input<typeof forgotSchema>;

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
    mode: 'onBlur',
    defaultValues: { email: '' },
  });

  const handleSendOtp = async (data: ForgotFormData) => {
    setApiError(null);
    setApiSuccess(null);
    setIsLoading(true);

    try {
      const response = await baseApi('/auth/forgot-password', {
        method: 'POST',
        data: { email: data.email.trim() },
      });

      if (response?.success || response?.statusCode === 200) {
        setApiSuccess(response?.message || 'A verification code has been sent to your email.');
        setTimeout(() => {
          router.push(`/forgot-password/verify-otp?email=${encodeURIComponent(data.email.trim())}`);
        }, 1200);
      } else {
        setApiError(response?.message || 'Failed to send OTP. Please try again.');
      }
    } catch (error: any) {
      setApiError(error.message || 'An unexpected network error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-x-hidden bg-white px-4 py-12">
      {/* Background dot grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(#34796f 1.5px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Decorative Glow Orbs */}
      <div className="bg-primary/5 pointer-events-none absolute top-1/4 left-1/4 z-0 h-72 w-72 rounded-full blur-3xl" />
      <div className="bg-primary/10 pointer-events-none absolute right-1/4 bottom-1/4 z-0 h-72 w-72 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md rounded-md border border-slate-100 bg-white p-5 shadow-slate-100/70">
        <div className="text-center">
          {/* Icon */}
          <div className="ring-primary/20 mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 ring-1">
            <LockKeyhole size={24} className="text-primary" />
          </div>

          {/* Heading */}
          <h1 className="text-text-primary mb-2 text-2xl font-bold">Forgot Password</h1>
          <p className="text-text-secondary mb-6 text-sm">
            Enter your email and we will send you an OTP to reset your password.
          </p>
        </div>

        {/* Alerts */}
        <div className="min-h-12.5 text-left empty:hidden">
          {apiError && (
            <div className="animate-in fade-in zoom-in-95 text-danger border-danger/20 bg-danger/5 mb-5 flex items-start gap-2 rounded-sm border p-3 text-xs font-medium">
              <span>⚠️</span> <span>{apiError}</span>
            </div>
          )}

          {apiSuccess && (
            <div className="animate-in fade-in zoom-in-95 text-success border-success/20 bg-success/5 mb-5 flex items-start gap-2 rounded-md border p-3 text-xs font-medium">
              <span>✅</span> <span>{apiSuccess}</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit(handleSendOtp)} className="space-y-4 text-left" noValidate>
          <InputField
            label="Email Address"
            name="email"
            type="email"
            control={control}
            placeholder="Enter your email"
            error={errors.email?.message}
            required
          />

          <DynamicActionButton
            type="submit"
            label="Send OTP"
            isLoading={isLoading}
            showIcon
            icon={Send}
            iconPosition="right"
            className="w-full"
          />
        </form>

        <div className="mt-4 border-t border-slate-100 pt-3 text-center">
          <Link
            className="text-primary inline-flex items-center gap-1.5 text-xs font-semibold hover:underline"
            href="/login"
          >
            <ArrowLeft size={14} /> Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
