'use client';

import { useEffect, useState } from 'react';

const HomePage = () => {
  // কাউন্টডাউন টাইমারের জন্য স্টেট (এখানে আপনার টার্গেট ডেট বসাবেন)
  const calculateTimeLeft = () => {
    const difference = +new Date('2026-08-01') - +new Date(); // উদাহরণ: ১ আগস্ট, ২০২৬
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [email, setEmail] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    alert('ধন্যবাদ! সাইট লাইভ হলে আপনাকে জানিয়ে দেওয়া হবে।');
    setEmail('');
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-linear-to-br from-slate-900 via-emerald-950 to-slate-900 px-4 text-white">
      <div className="absolute top-1/4 left-1/4 -z-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="absolute right-1/4 bottom-1/4 -z-10 h-72 w-72 rounded-full bg-teal-500/10 blur-[120px]" />

      <div className="w-full max-w-3xl text-center">
        <h1 className="mb-2 text-3xl font-extrabold tracking-wider text-emerald-400 sm:text-4xl">
          Edu<span className="text-white">Next</span>
        </h1>
        <p className="text-xs tracking-[0.2em] text-slate-400 uppercase">
          The Next-Gen Learning Platform
        </p>

        {/* heading */}
        <h2 className="mt-8 bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
          We Are Coming Soon
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-slate-400 sm:text-lg">
          আমরা তৈরি করছি এমন একটি প্ল্যাটফর্ম যেখানে শেখা এবং শেখানো হবে আরও সহজ। চোখ রাখুন, অসাধারণ
          কিছু আসতে চলেছে!
        </p>

        {/* Countdown Timer */}
        <div className="mx-auto mt-10 grid max-w-xl grid-cols-4 gap-2 sm:gap-4">
          {Object.entries(timeLeft).map(([label, value]) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-3 shadow-xl backdrop-blur-md"
            >
              <span className="text-2xl font-bold text-emerald-400 tabular-nums sm:text-4xl">
                {String(value).padStart(2, '0')}
              </span>
              <span className="mt-1 text-xs tracking-wider text-slate-400 uppercase sm:text-sm">
                {label === 'days'
                  ? 'Days'
                  : label === 'hours'
                    ? 'Hours'
                    : label === 'minutes'
                      ? 'Min'
                      : 'Sec'}
              </span>
            </div>
          ))}
        </div>

        {/* Email Notification Form */}
        <form onSubmit={handleNotify} className="mx-auto mt-12 max-w-md">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:rounded-full sm:border sm:border-white/10 sm:bg-white/5 sm:p-1.5 sm:backdrop-blur-md">
            <input
              type="email"
              placeholder="আপনার ইমেইলটি দিন..."
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-full bg-white/5 px-5 py-3 text-sm text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-500 sm:bg-transparent sm:focus:ring-0"
            />
            <button
              type="submit"
              className="w-full rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-all hover:bg-emerald-400 active:scale-95 sm:w-auto sm:whitespace-nowrap"
            >
              Notify Me
            </button>
          </div>
        </form>

        {/* Social Links */}
        <div className="mt-16 flex justify-center gap-6 text-sm text-slate-500">
          <a href="#" className="transition-colors hover:text-emerald-400">
            Facebook
          </a>
          <a href="#" className="transition-colors hover:text-emerald-400">
            Twitter
          </a>
          <a href="#" className="transition-colors hover:text-emerald-400">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
