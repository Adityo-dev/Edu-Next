/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import InputField from '@/components/dashboard/Fields/InputField/InputField';
import OtpInput from '@/components/shared/OtpInput';
import { baseApi } from '@/services/root/baseApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, KeyRound, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const resetSchema = z
  .object({
    otp: z.string().min(6, 'OTP must be 6 characters.'),
    newPassword: z.string().min(6, 'Password must be at least 6 characters.'),
    confirmPassword: z.string().min(1, 'Please confirm your password.'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type ResetFormData = z.input<typeof resetSchema>;

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const [step, setStep] = useState<1 | 2>(1);
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);
  const [otpKey, setOtpKey] = useState(0);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
    mode: 'onBlur',
    defaultValues: { otp: '', newPassword: '', confirmPassword: '' },
  });

  const handleReset = async (data: ResetFormData) => {
    if (!resetToken) {
      setApiError('Reset token missing. Please verify your OTP again.');
      setStep(1);
      return;
    }

    setApiError(null);
    setApiSuccess(null);
    setIsLoading(true);

    try {
      const response = await baseApi('/auth/reset-password', {
        method: 'POST',
        data: {
          resetToken,
          newPassword: data.newPassword,
        },
      });

      if (response?.success || response?.statusCode === 200) {
        setApiSuccess(
          response?.message ||
            'Your account password has been reset successfully. Proceed to login.',
        );
        setTimeout(() => {
          router.push('/login');
        }, 1500);
      } else {
        setApiError(response?.message || 'Invalid or expired reset token / Password too short');
      }
    } catch (error: any) {
      setApiError(error.message || 'An unexpected network error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpComplete = async (otp: string) => {
    setValue('otp', otp, { shouldValidate: true });

    if (!email) {
      setApiError('Email is missing. Please request a new OTP from the forgot password page.');
      return;
    }

    setApiError(null);
    setApiSuccess(null);
    setIsVerifyingOtp(true);

    try {
      const response = await baseApi('/auth/verify-reset-otp', {
        method: 'POST',
        data: {
          email,
          otp: otp.trim(),
        },
      });

      if (response?.success || response?.statusCode === 200) {
        setApiSuccess(response?.message || 'OTP verified successfully.');
        setResetToken(response?.data?.resetToken || null);

        setTimeout(() => {
          setApiSuccess(null);
          setStep(2);
        }, 800);
      } else {
        setApiError(response?.message || 'Invalid or expired OTP');
        setOtpKey((k) => k + 1);
        setValue('otp', '');
      }
    } catch (error: any) {
      setApiError(error.message || 'An unexpected network error occurred.');
      setOtpKey((k) => k + 1);
      setValue('otp', '');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-md rounded-md border border-slate-100 bg-white p-5 shadow-slate-100/70">
      <div className="text-center">
        {/* Icon */}
        <div className="ring-primary/20 mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 ring-1">
          <KeyRound size={24} className="text-primary" />
        </div>

        {/* Heading */}
        <h1 className="text-text-primary mb-2 text-2xl font-bold">Reset Password</h1>

        {step === 1 ? (
          <>
            <p className="text-text-secondary text-sm">We sent a 6-digit code to</p>
            <p className="mt-2 mb-6 inline-block max-w-full rounded-md border border-slate-100 bg-slate-50 px-3 py-1.5 text-xs font-semibold break-all">
              {email || 'your email'}
            </p>
          </>
        ) : (
          <div className="mb-8">
            <div className="mx-auto mb-2 flex w-max items-center justify-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
              <span>✅</span> Code Format Accepted
            </div>
            <p className="text-text-secondary text-sm">
              Now enter your new password to verify and reset.
            </p>
          </div>
        )}
      </div>

      {/* Alerts */}
      <div className="min-h-12.5 empty:hidden">
        {apiError && (
          <div className="animate-in fade-in zoom-in-95 text-danger border-danger/20 bg-danger/5 mb-5 flex items-start gap-2 rounded-sm border p-3 text-left text-xs font-medium">
            <span>⚠️</span> <span>{apiError}</span>
          </div>
        )}

        {apiSuccess && (
          <div className="animate-in fade-in zoom-in-95 text-success border-success/20 bg-success/5 mb-5 flex items-start gap-2 rounded-md border p-3 text-left text-xs font-medium">
            <span>✅</span> <span>{apiSuccess}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit(handleReset)} className="text-left" noValidate>
        {/* Step 1: OTP Input */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-2 space-y-4">
            <div>
              <label className="text-text-secondary mb-2 block text-center text-xs font-semibold tracking-wider uppercase">
                Enter 6-digit Code <span className="text-danger">*</span>
              </label>
              <div className="flex justify-center">
                <Controller
                  name="otp"
                  control={control}
                  render={() => (
                    <OtpInput
                      key={otpKey}
                      length={6}
                      onComplete={handleOtpComplete}
                      disabled={isLoading || isVerifyingOtp}
                      error={!!errors.otp || !!apiError}
                    />
                  )}
                />
              </div>

              {isVerifyingOtp ? (
                <div className="text-text-secondary mt-4 flex items-center justify-center gap-2 text-xs font-medium">
                  <RefreshCw size={14} className="text-primary animate-spin" />
                  <span>Checking code...</span>
                </div>
              ) : (
                errors.otp && (
                  <p className="text-danger mt-2 text-center text-xs">{errors.otp.message}</p>
                )
              )}
            </div>
          </div>
        )}

        {/* Step 2: Passwords */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-2 space-y-6">
            <InputField
              label="New Password"
              name="newPassword"
              type="password"
              control={control}
              placeholder="Enter new password"
              error={errors.newPassword?.message}
              required
            />

            <InputField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              control={control}
              placeholder="Confirm new password"
              error={errors.confirmPassword?.message}
              required
            />

            <DynamicActionButton
              type="submit"
              label="Reset Password"
              isLoading={isLoading}
              showIcon
              icon={KeyRound}
              iconPosition="right"
              className="w-full"
            />
          </div>
        )}
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
  );
};

const ForgotPasswordVerifyOtpPage = () => {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-x-hidden bg-white px-4 py-12 lg:px-6">
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

      <div className="relative z-10 w-full max-w-md">
        <Suspense fallback={<div className="text-center text-slate-500">Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
};

export default ForgotPasswordVerifyOtpPage;
