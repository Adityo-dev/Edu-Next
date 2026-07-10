import { BookOpen, Home, SearchX } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F9FAFB] px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        {/* Playful Floating Elements */}
        <div className="relative mx-auto mb-8 h-25 w-25 sm:h-34 sm:w-34">
          <div className="absolute inset-0 animate-[spin_10s_linear_infinite] rounded-full border-2 border-dashed border-emerald-200" />
          <div className="bg-primary/10 text-primary absolute inset-2 flex items-center justify-center rounded-full shadow-inner">
            <SearchX size={64} strokeWidth={1.5} />
          </div>
          {/* Floating book icon */}
          <div className="absolute -top-2 -right-2 animate-bounce rounded-full bg-white p-2 shadow-md">
            <BookOpen size={24} className="text-yellow-500" />
          </div>
        </div>

        <p className="text-primary text-lg font-semibold tracking-widest uppercase sm:text-xl">
          404 Error
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
          Page not <span className="text-primary">found</span>
        </h1>
        <p className="text-text-secondary mx-auto mt-6 max-w-lg leading-relaxed sm:text-lg">
          Oops! Looks like this page took a day off. The class you are looking for might have been
          moved or deleted. Let&apos;s get you back on track!
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="bg-primary flex items-center gap-2 rounded-sm px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#2a6159] active:scale-95 sm:px-6 sm:py-4"
          >
            <Home size={18} />
            Back to Home
          </Link>
          <Link
            href="/courses"
            className="flex items-center gap-2 rounded-sm border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-95 sm:px-6 sm:py-4"
          >
            <BookOpen size={18} />
            Browse Courses
          </Link>
        </div>

        {/* Support Link */}
        <div className="mt-12">
          <p className="text-sm text-slate-500">
            Need help finding something?{' '}
            <Link href="/contact" className="text-primary font-semibold hover:underline">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
