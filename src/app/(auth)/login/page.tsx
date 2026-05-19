'use client';

import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      {/* ── Left: Form Side ─────────────────────────────────────────────────── */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="mb-10 flex items-center gap-3">
            <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-sm text-white shadow-sm">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M9.5 2A5 5 0 0 1 12 4a5 5 0 0 1 2.5-2 5 5 0 0 1 5 5 5 5 0 0 1-2.5 4.3" />
                <path d="M5 7.3A5 5 0 0 1 7.5 2" />
                <path d="M12 12v10" />
                <path d="M8 17l4 4 4-4" />
              </svg>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-black tracking-tighter">
                <span className="text-primary">Edu</span>
                <span className="text-secondary">Next</span>
              </span>
              <span className="text-[10px] font-semibold tracking-[0.2em] text-slate-400 uppercase">
                Learn & Grow
              </span>
            </div>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-black tracking-tight">Welcome back 👋</h1>
            <p className="text-text-secondary text-base">
              Sign in to continue your learning journey.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={17}
                  className="text-text-secondary absolute top-1/2 left-4 -translate-y-1/2"
                />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="text-text-primary focus:border-primary w-full rounded-sm border border-slate-200 bg-white py-3.5 pr-4 pl-11 text-sm transition-all outline-none focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <Link
                  href="/forgot-password"
                  className="text-primary text-xs font-semibold hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock
                  size={17}
                  className="text-text-secondary absolute top-1/2 left-4 -translate-y-1/2"
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="text-text-primary focus:border-primary w-full rounded-sm border border-slate-200 bg-white py-3.5 pr-12 pl-11 text-sm transition-all outline-none focus:ring-2 focus:ring-emerald-100"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-text-secondary absolute top-1/2 right-4 -translate-y-1/2 transition-colors hover:text-slate-700"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setRememberMe(!rememberMe)}
                className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-all ${
                  rememberMe ? 'border-primary bg-primary' : 'border-slate-300 bg-white'
                }`}
              >
                {rememberMe && <span className="text-[10px] font-black text-white">✓</span>}
              </button>
              <span className="text-sm text-slate-600">Remember me for 30 days</span>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              className="bg-primary w-full cursor-pointer rounded-sm py-4 text-base font-bold text-white shadow-sm shadow-emerald-200 transition-all hover:bg-[#2a6159] active:scale-95"
            >
              Sign In
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-text-secondary text-xs">or continue with</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Google */}
            <button className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-sm border border-slate-200 bg-white py-3.5 text-sm font-semibold text-slate-700 shadow-xs transition-all hover:bg-slate-50 active:scale-95">
              <svg viewBox="0 0 24 24" className="h-5 w-5">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>
          </div>

          {/* Register Link */}
          <p className="mt-8 text-center text-sm text-slate-600">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-primary font-bold hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>

      {/* ── Right: Visual Side ───────────────────────────────────────────────── */}
      <div className="bg-primary relative hidden overflow-hidden lg:flex lg:w-1/2 lg:flex-col lg:items-center lg:justify-center lg:px-16">
        {/* Dot Grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1.5px, transparent 1px)`,
            backgroundSize: '28px 28px',
          }}
        />

        {/* SVG Circles */}
        <div className="absolute -right-16 -bottom-16 opacity-10">
          <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
            <circle cx="200" cy="200" r="198" stroke="#ffffff" strokeWidth="2" />
            <circle cx="200" cy="200" r="150" stroke="#ffffff" strokeWidth="2" />
            <circle cx="200" cy="200" r="100" stroke="#ffffff" strokeWidth="2" />
          </svg>
        </div>

        <div className="relative z-10 text-center">
          {/* Illustration */}
          <div className="mb-8 overflow-hidden rounded-md shadow-2xl shadow-black/20">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800"
              alt="Learning"
              width={480}
              height={320}
              className="h-72 w-full object-cover opacity-80"
            />
          </div>

          <h2 className="mb-4 text-3xl font-black text-white">
            Continue Your <span className="text-yellow-400">Learning Journey</span>
          </h2>
          <p className="mx-auto max-w-sm text-base leading-relaxed text-white/70">
            Access your courses, track your progress, and earn certificates — all in one place.
          </p>

          {/* Stats */}
          <div className="mt-8 flex items-center justify-center gap-8">
            {[
              { value: '5k+', label: 'Students' },
              { value: '120+', label: 'Courses' },
              { value: '50+', label: 'Instructors' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-black text-white">{s.value}</p>
                <p className="text-xs text-white/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
