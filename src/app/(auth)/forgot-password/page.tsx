/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { baseApi } from '@/services/root/baseApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Mail, X } from 'lucide-react';
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
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
    mode: 'onBlur',
    defaultValues: { email: '' },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const emailValue = watch('email');

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
        setApiSuccess(
          response?.message || 'A 6-digit verification code has been sent to your email.',
        );
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
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white px-4 py-12 sm:px-6">
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

      <div className="relative z-10 w-full max-w-sm rounded-xl border border-slate-100 bg-white p-6 shadow-md shadow-slate-100/70 sm:p-8">
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-2xl font-black text-slate-900 sm:text-3xl">Forgot Password?</h1>
          <p className="text-sm text-slate-500">
            No worries! Enter your email and we will send you a 6-digit OTP to reset it.
          </p>
        </div>

        {apiError && (
          <div className="mb-4 rounded-sm border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-600">
            ⚠️ {apiError}
          </div>
        )}
        {apiSuccess && (
          <div className="mb-4 rounded-sm border border-emerald-200 bg-emerald-50 p-3 text-xs font-medium text-emerald-600">
            ✅ {apiSuccess}
          </div>
        )}

        <form onSubmit={handleSubmit(handleSendOtp)} className="space-y-4" noValidate>
          <div>
            <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
              Email <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Mail
                className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400"
                size="{15}"
              />
              <input
                type="email"
                disabled={isLoading}
                {...register('email')}
                placeholder="Enter your email"
                autoComplete="email"
                className={`focus:border-primary w-full rounded-sm border bg-[#F9FAFB] py-3.5 pr-10 pl-11 text-sm transition-all outline-none focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:opacity-60 ${
                  errors.email ? 'border-red-300' : 'border-slate-200'
                }`}
              />
              {emailValue && (
                <button
                  type="button"
                  onClick={() => setValue('email', '', { shouldValidate: true })}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  tabIndex={-1}
                >
                  <X size="{14}" />
                </button>
              )}
            </div>
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm py-4 text-sm font-bold text-white transition-all hover:bg-[#2a6159] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Sending OTP...
              </>
            ) : (
              'Send OTP →'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            className="text-primary inline-flex items-center gap-1.5 text-xs font-bold hover:underline"
            href="/login"
          >
            <ArrowLeft size="{14}" /> Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
