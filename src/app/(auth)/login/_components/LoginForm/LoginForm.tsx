/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import InputField from '@/components/dashboard/Fields/InputField/InputField';
import { ROLE_DASHBOARD_HOME } from '@/components/dashboard/sidebar/sidebarRoutes';
import { Checkbox } from '@/components/ui/checkbox';
import { apiClient } from '@/redux/apiClient/apiClient';
import { setAuth } from '@/redux/features/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { setUserProfile } from '@/services/auth/auth.service';
import { baseApi } from '@/services/root/baseApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { LogIn } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required.').email('Please enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
  remember: z.boolean().default(false),
});

type LoginFormData = z.input<typeof loginSchema>;

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect');

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const handleLogin = async (data: LoginFormData) => {
    setApiError(null);
    setApiSuccess(null);

    const payload = {
      email: data.email.trim(),
      password: data.password,
    };

    try {
      setIsLoading(true);

      const response = await baseApi('/auth/login', {
        method: 'POST',
        data: payload,
      });

      if (response?.statusCode === 403 || response?.success === false) {
        const message = (response?.message || '').toLowerCase();

        if (message.includes('verify') || message.includes('not verified')) {
          setApiError('Your email is not verified yet. Redirecting to verification page...');
          setTimeout(() => {
            router.push(`/verify-otp?email=${encodeURIComponent(data.email.trim())}`);
          }, 1200);
          return;
        }

        setApiError(response?.message || 'Login failed. Please try again.');
        return;
      }

      if (response && (response.success || response.statusCode === 200)) {
        const { token, user: rawUser } = response;

        if (!token || !rawUser) {
          setApiError('Login response is missing token or user data.');
          return;
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _password, ...user } = rawUser;

        await setUserProfile(user, token);
        dispatch(setAuth({ user }));
        dispatch(apiClient.util.invalidateTags(['Courses']));

        setApiSuccess('Login successful! Redirecting...');

        const dashboardPath =
          ROLE_DASHBOARD_HOME[user.role as keyof typeof ROLE_DASHBOARD_HOME] ?? '/';

        setTimeout(() => {
          router.push(redirectPath || dashboardPath);
        }, 500);
      } else {
        setApiError(response?.message || 'Invalid email or password.');
      }
    } catch (error: any) {
      setApiError(error.message || 'An unexpected network error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center px-4 py-12 lg:w-[50%]">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <h1 className="text-text-primary mb-2 text-2xl font-bold">Welcome back 👋</h1>
          <p className="text-text-secondary text-sm">
            No account?{' '}
            <Link href="/register" className="text-primary font-semibold hover:underline">
              Sign up free
            </Link>
          </p>
        </div>

        <button
          type="button"
          disabled={isLoading}
          className="mb-5 flex w-full cursor-pointer items-center justify-center gap-3 rounded-sm border border-slate-200 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        <div className="mb-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-100" />
          <span className="text-text-secondary text-xs">or continue with email</span>
          <div className="h-px flex-1 bg-slate-100" />
        </div>

        {apiError && (
          <div className="text-danger mb-4 rounded-sm border border-red-200 bg-red-50 p-3 text-xs font-medium">
            ⚠️ {apiError}
          </div>
        )}
        {apiSuccess && (
          <div className="text-success mb-4 rounded-sm border border-emerald-200 bg-emerald-50 p-3 text-xs font-medium">
            ✅ {apiSuccess}
          </div>
        )}

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4" noValidate>
          <InputField
            label="Email"
            name="email"
            type="email"
            control={control}
            placeholder="Enter your email"
            error={errors.email?.message}
            required
          />

          <div className="relative">
            <Link
              href="/forgot-password"
              className="text-primary absolute top-0 right-0 z-10 text-xs font-semibold hover:underline"
            >
              Forgot password?
            </Link>
            <InputField
              label="Password"
              name="password"
              type="password"
              control={control}
              placeholder="Enter your password"
              error={errors.password?.message}
              required
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Controller
              name="remember"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="remember"
                  disabled={isLoading}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <label
              htmlFor="remember"
              className="text-text-secondary cursor-pointer text-sm select-none"
            >
              Remember me for 30 days
            </label>
          </div>

          <DynamicActionButton
            type="submit"
            label="Sign In"
            isLoading={isLoading}
            showIcon
            icon={LogIn}
            iconPosition="right"
            className="w-full"
          />
        </form>

        <p className="text-text-secondary mt-6 text-center text-xs">
          By signing in, you agree to our{' '}
          <Link href="/terms" className="text-primary hover:underline">
            Terms
          </Link>{' '}
          &{' '}
          <Link href="/privacy-policy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
