/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ROLE_DASHBOARD_HOME } from '@/components/dashboard/sidebar/sidebarRoutes';
import { setAuth } from '@/redux/features/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { setUserProfile } from '@/services/auth/auth.service';
import { baseApi } from '@/services/root/baseApi';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);

  const [form, setForm] = useState({ email: '', password: '', remember: false });

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setApiSuccess(null);

    if (!form.email.trim() || !form.password) {
      setApiError('Please fill in all fields.');
      return;
    }

    const payload = {
      email: form.email.trim(),
      password: form.password,
    };

    try {
      setIsLoading(true);

      const response = await baseApi('/auth/login', {
        method: 'POST',
        data: payload,
      });

      if (response && (response.success || response.statusCode === 200)) {
        const { token, user: rawUser } = response;

        if (!token || !rawUser) {
          setApiError('Login response is missing token or user data.');
          return;
        }

        const { password: _password, ...user } = rawUser;

        await setUserProfile(user, token);
        dispatch(setAuth({ user }));

        setApiSuccess('Login successful! Redirecting...');

        const dashboardPath =
          ROLE_DASHBOARD_HOME[user.role as keyof typeof ROLE_DASHBOARD_HOME] ?? '/';

        setTimeout(() => {
          router.push(dashboardPath);
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
    <div className="flex min-h-screen bg-white">
      {/* ── Left Panel  */}
      <div className="relative hidden w-[55%] overflow-hidden lg:flex">
        {/* Background */}
        <div className="bg-primary absolute inset-0" />

        {/* Dot Grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1.5px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Gradient Orbs */}
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="bg-secondary/20 absolute -right-32 -bottom-32 h-96 w-96 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10 flex w-full flex-col justify-between p-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-white/15 backdrop-blur-sm">
              <span className="text-lg font-black text-white">E</span>
            </div>
            <span className="text-xl font-black text-white">
              Edu<span className="text-yellow-400">Next</span>
            </span>
          </Link>

          {/* Center */}
          <div>
            <h2 className="mb-5 text-5xl leading-[1.1] font-black text-white">
              Learn Skills <br />
              That Actually <br />
              <span className="text-yellow-400">Matter.</span>
            </h2>
            <p className="mb-10 max-w-sm text-base leading-relaxed text-white/60">
              Sign in to continue your learning journey. Your progress, courses, and certificates
              are waiting.
            </p>

            {/* Floating Course Cards */}
            <div className="space-y-3">
              {[
                {
                  title: 'Web Development',
                  students: '1.2k',
                  progress: 72,
                  color: 'bg-emerald-400',
                },
                { title: 'UI/UX Design', students: '980', progress: 45, color: 'bg-yellow-400' },
                { title: 'Digital Marketing', students: '850', progress: 88, color: 'bg-blue-400' },
              ].map((card, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-md border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-sm"
                >
                  <div className={`h-2.5 w-2.5 shrink-0 rounded-full ${card.color}`} />
                  <div className="flex-1">
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">{card.title}</span>
                      <span className="text-xs text-white/50">{card.students} students</span>
                    </div>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className={`h-full rounded-full ${card.color}`}
                        style={{ width: `${card.progress}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs font-bold text-white/60">{card.progress}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Avatars */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Image
                  key={i}
                  src={`https://i.pravatar.cc/150?u=auth${i}`}
                  alt="Student"
                  width={34}
                  height={34}
                  className="border-primary rounded-full border-2"
                />
              ))}
            </div>
            <div>
              <div className="mb-0.5 flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="text-xs text-yellow-400">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-xs text-white/50">
                Trusted by <span className="font-bold text-white">5,000+</span> students
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Panel  */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-16 lg:w-[45%]">
        <div className="w-full max-w-sm">
          {/* Mobile Logo */}
          <Link href="/" className="mb-10 flex items-center gap-2 lg:hidden">
            <span className="text-2xl font-black">
              <span className="text-primary">Edu</span>
              <span className="text-secondary">Next</span>
            </span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-text-primary mb-2 text-3xl font-black">Welcome back 👋</h1>
            <p className="text-text-secondary text-sm">
              No account?{' '}
              <Link href="/register" className="text-primary font-bold hover:underline">
                Sign up free
              </Link>
            </p>
          </div>

          {/* Google */}
          <button
            type="button"
            disabled={isLoading}
            className="mb-6 flex w-full items-center justify-center gap-3 rounded-sm border border-slate-200 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 active:scale-95 disabled:opacity-50"
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

          {/* Divider */}
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-100" />
            <span className="text-text-secondary text-xs">or continue with email</span>
            <div className="h-px flex-1 bg-slate-100" />
          </div>

          {/* Error and Success Notifications */}
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

          {/* Wrapped inputs in an HTML form element */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={15}
                  className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="email"
                  required
                  disabled={isLoading}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Enter your email"
                  className="focus:border-primary w-full rounded-sm border border-slate-200 bg-[#F9FAFB] py-3.5 pr-4 pl-11 text-sm transition-all outline-none focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:opacity-60"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-primary text-xs font-semibold hover:underline"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock
                  size={15}
                  className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400"
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  disabled={isLoading}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Enter your Password"
                  className="focus:border-primary w-full rounded-sm border border-slate-200 bg-[#F9FAFB] py-3.5 pr-12 pl-11 text-sm transition-all outline-none focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="remember"
                disabled={isLoading}
                checked={form.remember}
                onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                className="accent-primary h-4 w-4 cursor-pointer"
              />
              <label htmlFor="remember" className="cursor-pointer text-sm text-slate-500">
                Remember me for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary w-full cursor-pointer rounded-sm py-4 text-sm font-bold text-white transition-all hover:bg-[#2a6159] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? 'Signing In...' : 'Sign In →'}
            </button>
          </form>

          {/* Footer Terms */}
          <p className="text-text-secondary mt-8 text-center text-xs">
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
    </div>
  );
};

export default LoginPage;
