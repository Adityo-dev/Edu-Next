/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ROLE_DASHBOARD_HOME } from '@/components/dashboard/sidebar/sidebarRoutes';
import { setAuth } from '@/redux/features/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { setUserProfile } from '@/services/auth/auth.service';
import { baseApi } from '@/services/root/baseApi';
import { Mail, RefreshCw } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import OtpInput from './_components/OtpInput/OtpInput';

const RESEND_COOLDOWN = 20;

const VerifyOtpForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN);
  const [otpKey, setOtpKey] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (cooldown > 0) {
      timerRef.current = setTimeout(() => setCooldown((c) => c - 1), 1000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [cooldown]);

  const handleVerify = async (otp: string) => {
    setApiError(null);
    setApiSuccess(null);
    setIsVerifying(true);

    try {
      const response = await baseApi('/auth/verify-otp', {
        method: 'POST',
        data: { email, otp },
      });

      if (response?.success && response?.token && response?.user) {
        const { token, user } = response;
        await setUserProfile(user, token);
        dispatch(setAuth({ user }));
        setApiSuccess('Email verified successfully! Redirecting...');
        const dashboardPath =
          ROLE_DASHBOARD_HOME[user.role as keyof typeof ROLE_DASHBOARD_HOME] ?? '/';
        setTimeout(() => router.push(dashboardPath), 1000);
      } else if (response?.success) {
        setApiSuccess('Email verified successfully! Redirecting to login...');
        setTimeout(() => router.push('/login'), 1200);
      } else {
        setApiError(response?.message || 'Invalid or expired OTP. Please try again.');
        setOtpKey((k) => k + 1);
      }
    } catch (error: any) {
      setApiError(error.message || 'Something went wrong. Please try again.');
      setOtpKey((k) => k + 1);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;
    setApiError(null);
    setApiSuccess(null);
    setIsResending(true);

    try {
      const response = await baseApi('/auth/resend-otp', {
        method: 'POST',
        data: { email },
      });

      if (response?.success) {
        setApiSuccess('A new OTP has been sent to your email.');
        setCooldown(RESEND_COOLDOWN);
        setOtpKey((k) => k + 1);
      } else {
        setApiError(response?.message || 'Failed to resend OTP.');
      }
    } catch (error: any) {
      setApiError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-full rounded-xl border border-slate-100 bg-white p-6 text-center shadow-md shadow-slate-100/70">
      {/* Icon */}
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50/80 ring-8 ring-emerald-50/40">
        <Mail size={24} className="text-primary" />
      </div>

      {/* Heading */}
      <h1 className="mb-1.5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Verify Your Email
      </h1>
      <p className="text-sm text-slate-500">We sent a 6-digit code to</p>
      <p className="mt-2 mb-6 inline-block max-w-full rounded-md border border-slate-100 bg-slate-50 px-3 py-1.5 text-xs font-semibold break-all text-slate-700">
        {email || 'your email'}
      </p>

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

      {/* OTP Input */}
      <div className="mb-5 flex justify-center">
        <OtpInput
          key={otpKey}
          length={6}
          onComplete={handleVerify}
          disabled={isVerifying}
          error={!!apiError}
        />
      </div>

      {/* Verifying Indicator */}
      <div className="mb-4 flex min-h-6 items-center justify-center">
        {isVerifying && (
          <p className="text-primary animate-in fade-in flex items-center gap-2 text-sm font-semibold">
            <RefreshCw size={14} className="animate-spin" />
            Verifying code...
          </p>
        )}
      </div>

      {/* Resend Action */}
      <div className="border-t border-slate-100 pt-5 text-sm text-slate-500">
        Didn&apos;t receive the code?{' '}
        {cooldown > 0 ? (
          <span className="ml-1 inline-block rounded-md border border-slate-100 bg-slate-50 px-2 py-0.5 text-xs font-semibold text-slate-400">
            Resend in {cooldown}s
          </span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className="text-primary ml-1 inline-flex cursor-pointer items-center gap-1.5 font-bold hover:underline disabled:opacity-50"
          >
            {isResending && <RefreshCw size={12} className="animate-spin" />}
            {isResending ? 'Sending...' : 'Resend OTP'}
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyOtpForm;
