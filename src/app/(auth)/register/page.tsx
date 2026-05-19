'use client';

import { Eye, EyeOff, GraduationCap, Lock, Mail, Phone, User, Video } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [role, setRole] = useState<'student' | 'instructor'>('student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      {/* ── Left: Visual Side ───────────────────────────────────────────────── */}
      <div className="bg-primary relative hidden overflow-hidden lg:flex lg:w-2/5 lg:flex-col lg:items-center lg:justify-center lg:px-16">
        {/* Dot Grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1.5px, transparent 1px)`,
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute -top-16 -left-16 opacity-10">
          <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
            <circle cx="200" cy="200" r="198" stroke="#ffffff" strokeWidth="2" />
            <circle cx="200" cy="200" r="150" stroke="#ffffff" strokeWidth="2" />
            <circle cx="200" cy="200" r="100" stroke="#ffffff" strokeWidth="2" />
          </svg>
        </div>

        <div className="relative z-10 text-center">
          <div className="mb-8 overflow-hidden rounded-md shadow-2xl shadow-black/20">
            <Image
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800"
              alt="Join EduNext"
              width={400}
              height={300}
              className="h-64 w-full object-cover opacity-80"
            />
          </div>

          <h2 className="mb-4 text-3xl font-black text-white">
            Join <span className="text-yellow-400">EduNext</span> Today
          </h2>
          <p className="mx-auto max-w-sm text-base leading-relaxed text-white/70">
            Start learning from verified instructors and build real digital skills — completely at
            your own pace.
          </p>

          {/* Benefits */}
          <div className="mt-8 space-y-3 text-left">
            {[
              '✅ Free preview on all courses',
              '✅ Certificate on course completion',
              '✅ Live sessions with instructors',
              '✅ Pay with bKash, Nagad or Rocket',
            ].map((b, i) => (
              <p key={i} className="text-sm text-white/80">
                {b}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right: Form Side ────────────────────────────────────────────────── */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-3/5">
        <div className="w-full max-w-lg">
          {/* Logo */}
          <Link href="/" className="mb-8 flex items-center gap-3">
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
          <div className="mb-7">
            <h1 className="mb-2 text-3xl font-black tracking-tight">Create your account 🚀</h1>
            <p className="text-text-secondary text-base">
              Join thousands of learners on EduNext — it&apos;s free to get started.
            </p>
          </div>

          {/* Role Toggle */}
          <div className="mb-7">
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              I want to join as
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setRole('student')}
                className={`flex items-center justify-center gap-3 rounded-sm border-2 py-4 text-sm font-bold transition-all ${
                  role === 'student'
                    ? 'border-primary text-primary bg-emerald-50'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                <GraduationCap size={20} />
                Student
              </button>
              <button
                onClick={() => setRole('instructor')}
                className={`flex items-center justify-center gap-3 rounded-sm border-2 py-4 text-sm font-bold transition-all ${
                  role === 'instructor'
                    ? 'border-primary text-primary bg-emerald-50'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                <Video size={20} />
                Instructor
              </button>
            </div>
            {role === 'instructor' && (
              <p className="mt-2 rounded-sm bg-yellow-50 px-3 py-2 text-xs text-yellow-600">
                ⚠️ Instructor accounts require admin verification before going live.
              </p>
            )}
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Full Name</label>
              <div className="relative">
                <User
                  size={17}
                  className="text-text-secondary absolute top-1/2 left-4 -translate-y-1/2"
                />
                <input
                  type="text"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="text-text-primary focus:border-primary w-full rounded-sm border border-slate-200 bg-white py-3.5 pr-4 pl-11 text-sm transition-all outline-none focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

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

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Phone Number
              </label>
              <div className="relative">
                <Phone
                  size={17}
                  className="text-text-secondary absolute top-1/2 left-4 -translate-y-1/2"
                />
                <input
                  type="tel"
                  placeholder="+880 1700-000000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="text-text-primary focus:border-primary w-full rounded-sm border border-slate-200 bg-white py-3.5 pr-4 pl-11 text-sm transition-all outline-none focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            {/* Password + Confirm — 2 column */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
                <div className="relative">
                  <Lock
                    size={17}
                    className="text-text-secondary absolute top-1/2 left-4 -translate-y-1/2"
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min. 8 characters"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="text-text-primary focus:border-primary w-full rounded-sm border border-slate-200 bg-white py-3.5 pr-12 pl-11 text-sm transition-all outline-none focus:ring-2 focus:ring-emerald-100"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-text-secondary absolute top-1/2 right-4 -translate-y-1/2 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock
                    size={17}
                    className="text-text-secondary absolute top-1/2 left-4 -translate-y-1/2"
                  />
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Repeat password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="text-text-primary focus:border-primary w-full rounded-sm border border-slate-200 bg-white py-3.5 pr-12 pl-11 text-sm transition-all outline-none focus:ring-2 focus:ring-emerald-100"
                  />
                  <button
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="text-text-secondary absolute top-1/2 right-4 -translate-y-1/2 hover:text-slate-700"
                  >
                    {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <button
                onClick={() => setAgreed(!agreed)}
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-all ${
                  agreed ? 'border-primary bg-primary' : 'border-slate-300 bg-white'
                }`}
              >
                {agreed && <span className="text-[10px] font-black text-white">✓</span>}
              </button>
              <p className="text-sm leading-relaxed text-slate-600">
                I agree to the{' '}
                <Link href="/terms" className="text-primary font-semibold hover:underline">
                  Terms & Conditions
                </Link>{' '}
                and{' '}
                <Link href="/privacy-policy" className="text-primary font-semibold hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!agreed}
              className={`w-full cursor-pointer rounded-sm py-4 text-base font-bold text-white shadow-sm transition-all active:scale-95 ${
                agreed
                  ? 'bg-primary shadow-emerald-200 hover:bg-[#2a6159]'
                  : 'cursor-not-allowed bg-slate-300'
              }`}
            >
              Create Account
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-text-secondary text-xs">or sign up with</span>
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

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link href="/login" className="text-primary font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
