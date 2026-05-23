'use client';

import { Eye, EyeOff, GraduationCap, Lock, Mail, Phone, User, Video } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type Role = 'student' | 'instructor';

const RegisterPage = () => {
  const [role, setRole] = useState<Role>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirm: '',
    expertise: '',
    agree: false,
  });

  const perks = {
    student: [
      { emoji: '🎓', text: 'Earn verified certificates' },
      { emoji: '📱', text: 'Learn on any device' },
      { emoji: '🎥', text: 'Join live sessions' },
      { emoji: '🔓', text: 'Free course previews' },
    ],
    instructor: [
      { emoji: '💰', text: 'Earn from every sale' },
      { emoji: '👥', text: 'Reach 5,000+ students' },
      { emoji: '📡', text: 'Host live classes' },
      { emoji: '🏦', text: 'Withdraw via bKash' },
    ],
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* ── Left Panel ───────────────────────────────────────────────────── */}
      <div className="relative hidden w-[45%] overflow-hidden lg:flex">
        <div className="absolute inset-0 bg-[#0f1a19]" />

        {/* Gradient */}
        <div className="from-primary/40 to-secondary/20 absolute inset-0 bg-linear-to-br via-transparent" />

        {/* Dot Grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1.5px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Orbs */}
        <div className="bg-primary/30 absolute -top-40 -left-40 h-80 w-80 rounded-full blur-3xl" />
        <div className="bg-secondary/20 absolute -right-40 -bottom-40 h-80 w-80 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10 flex w-full flex-col justify-between p-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-white/10 backdrop-blur-sm">
              <span className="text-lg font-black text-white">E</span>
            </div>
            <span className="text-xl font-black text-white">
              Edu<span className="text-yellow-400">Next</span>
            </span>
          </Link>

          {/* Center */}
          <div>
            <div
              className={`mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                role === 'student'
                  ? 'bg-primary/30 text-emerald-300'
                  : 'bg-secondary/30 text-orange-300'
              }`}
            >
              {role === 'student' ? (
                <>
                  <GraduationCap size={15} /> Joining as Student
                </>
              ) : (
                <>
                  <Video size={15} /> Joining as Instructor
                </>
              )}
            </div>

            <h2 className="mb-5 text-5xl leading-[1.1] font-black text-white">
              {role === 'student' ? (
                <>
                  Start Your <br /> Learning <br />{' '}
                  <span className="text-yellow-400">Journey.</span>
                </>
              ) : (
                <>
                  Share Your <br /> Expertise & <br />{' '}
                  <span className="text-yellow-400">Earn.</span>
                </>
              )}
            </h2>

            <p className="mb-10 max-w-xs text-sm leading-relaxed text-white/50">
              {role === 'student'
                ? 'Create your free account and get instant access to 120+ courses taught by verified instructors in Bangladesh.'
                : 'Apply as an instructor, get verified by our admin, and start earning from thousands of eager learners.'}
            </p>

            {/* Perks */}
            <div className="grid grid-cols-2 gap-3">
              {perks[role].map((perk, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-sm border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm"
                >
                  <span className="text-xl">{perk.emoji}</span>
                  <span className="text-xs font-medium text-white/70">{perk.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Image
                  key={i}
                  src={`https://i.pravatar.cc/150?u=reg${i}`}
                  alt="User"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-[#0f1a19]"
                />
              ))}
            </div>
            <p className="text-xs text-white/40">
              <span className="font-bold text-white">5,000+</span> people already joined
            </p>
          </div>
        </div>
      </div>

      {/* ── Right Panel ──────────────────────────────────────────────────── */}
      <div className="flex w-full flex-col items-center justify-center overflow-y-auto px-6 py-12 lg:w-[55%]">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <Link href="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <span className="text-2xl font-black">
              <span className="text-primary">Edu</span>
              <span className="text-secondary">Next</span>
            </span>
          </Link>

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-text-primary mb-2 text-3xl font-black">Create account ✨</h1>
            <p className="text-text-secondary text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-primary font-bold hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          {/* Role Toggle */}
          <div className="mb-6 grid grid-cols-2 gap-2">
            <button
              onClick={() => setRole('student')}
              className={`flex items-center justify-center gap-2.5 rounded-sm border-2 py-4 text-sm font-bold transition-all duration-300 ${
                role === 'student'
                  ? 'border-primary text-primary bg-emerald-50'
                  : 'border-slate-200 text-slate-400 hover:border-slate-300'
              }`}
            >
              <GraduationCap size={18} />I am a Student
            </button>
            <button
              onClick={() => setRole('instructor')}
              className={`flex items-center justify-center gap-2.5 rounded-sm border-2 py-4 text-sm font-bold transition-all duration-300 ${
                role === 'instructor'
                  ? 'border-secondary text-secondary bg-orange-50'
                  : 'border-slate-200 text-slate-400 hover:border-slate-300'
              }`}
            >
              <Video size={18} />I am an Instructor
            </button>
          </div>

          {/* Google */}
          <button className="mb-5 flex w-full items-center justify-center gap-3 rounded-sm border border-slate-200 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 active:scale-95">
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
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-100" />
            <span className="text-text-secondary text-xs">or register with email</span>
            <div className="h-px flex-1 bg-slate-100" />
          </div>

          {/* Fields */}
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
                Full Name
              </label>
              <div className="relative">
                <User
                  size={15}
                  className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name"
                  className="focus:border-primary w-full rounded-sm border border-slate-200 bg-[#F9FAFB] py-3.5 pr-4 pl-11 text-sm transition-all outline-none focus:bg-white focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

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
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="focus:border-primary w-full rounded-sm border border-slate-200 bg-[#F9FAFB] py-3.5 pr-4 pl-11 text-sm transition-all outline-none focus:bg-white focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
                Phone
              </label>
              <div className="relative">
                <Phone
                  size={15}
                  className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+880 1700-000000"
                  className="focus:border-primary w-full rounded-sm border border-slate-200 bg-[#F9FAFB] py-3.5 pr-4 pl-11 text-sm transition-all outline-none focus:bg-white focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            {/* Instructor Expertise */}
            {role === 'instructor' && (
              <div>
                <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
                  Area of Expertise
                </label>
                <select
                  value={form.expertise}
                  onChange={(e) => setForm({ ...form, expertise: e.target.value })}
                  className="focus:border-secondary w-full cursor-pointer appearance-none rounded-sm border border-slate-200 bg-[#F9FAFB] px-4 py-3.5 text-sm transition-all outline-none focus:bg-white focus:ring-2 focus:ring-orange-100"
                >
                  <option value="">Select your expertise</option>
                  {[
                    'Web Development',
                    'UI/UX Design',
                    'Digital Marketing',
                    'Freelancing',
                    'Graphic Design',
                    'Data Analytics',
                    'Mobile App Development',
                    'Cybersecurity',
                    'Machine Learning & AI',
                    'Video Editing',
                    'Other',
                  ].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Password */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={15}
                    className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Min. 8 chars"
                    className="focus:border-primary w-full rounded-sm border border-slate-200 bg-[#F9FAFB] py-3.5 pr-10 pl-11 text-sm transition-all outline-none focus:bg-white focus:ring-2 focus:ring-emerald-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
                  Confirm
                </label>
                <div className="relative">
                  <Lock
                    size={15}
                    className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={form.confirm}
                    onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                    placeholder="Re-enter"
                    className="focus:border-primary w-full rounded-sm border border-slate-200 bg-[#F9FAFB] py-3.5 pr-10 pl-11 text-sm transition-all outline-none focus:bg-white focus:ring-2 focus:ring-emerald-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400"
                  >
                    {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2.5 pt-1">
              <input
                type="checkbox"
                id="agree"
                checked={form.agree}
                onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                className="accent-primary mt-0.5 h-4 w-4 cursor-pointer"
              />
              <label
                htmlFor="agree"
                className="cursor-pointer text-xs leading-relaxed text-slate-500"
              >
                I agree to EduNext&lsquo;s{' '}
                <Link href="/terms" className="text-primary font-semibold hover:underline">
                  Terms
                </Link>{' '}
                &{' '}
                <Link href="/privacy-policy" className="text-primary font-semibold hover:underline">
                  Privacy Policy
                </Link>
                {role === 'instructor' &&
                  '. I understand my profile needs admin verification before going live.'}
              </label>
            </div>

            {/* Submit */}
            <button
              className={`w-full cursor-pointer rounded-sm py-4 text-sm font-bold text-white transition-all active:scale-95 ${
                role === 'student'
                  ? 'bg-primary hover:bg-[#2a6159]'
                  : 'bg-secondary hover:bg-[#d98c0a]'
              }`}
            >
              {role === 'student' ? 'Create Student Account →' : 'Apply as Instructor →'}
            </button>

            {/* Instructor Note */}
            {role === 'instructor' && (
              <div className="rounded-sm border border-orange-100 bg-orange-50 px-4 py-3 text-xs leading-relaxed text-slate-600">
                📋 <span className="font-semibold">Note:</span> Instructor accounts require admin
                verification. You will receive an email notification once approved.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
