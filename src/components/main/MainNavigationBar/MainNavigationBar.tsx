'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'; // Shadcn Sheet imports
import { Bookmark, Menu, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Courses', href: '/courses' },
  { name: 'Blog', href: '/blog' },
];

const MainNavigationBar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-subtle fixed top-0 z-50 w-full border-b border-slate-100 backdrop-blur-lg">
      <div className="mx-auto flex max-w-400 items-center justify-between px-6 py-4">
        {/* Left Section: Logo */}
        <div className="group flex cursor-pointer items-center gap-3">
          <div className="bg-primary relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-sm text-white shadow-sm transition-transform duration-300">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-7 w-7"
            >
              <path d="M9.5 2A5 5 0 0 1 12 4a5 5 0 0 1 2.5-2 5 5 0 0 1 5 5 5 5 0 0 1-2.5 4.3" />
              <path d="M5 7.3A5 5 0 0 1 7.5 2" />
              <path d="M12 12v10" />
              <path d="M8 17l4 4 4-4" />
              <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.3" />
            </svg>
            <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-white/20 blur-md" />
          </div>

          <div className="flex flex-col leading-tight">
            <h1 className="text-2xl font-black tracking-tighter">
              <span className="text-primary">Edu</span>
              <span className="text-secondary"> Next</span>
            </h1>
            <span className="text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase">
              Learn the Future
            </span>
          </div>
        </div>

        {/* Middle Section: Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-all duration-300 ${
                  isActive ? 'text-primary font-bold' : 'hover:text-primary text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right Section: Icons & Sign In */}
        <div className="flex items-center gap-5">
          <button className="hidden h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-all hover:bg-slate-50 active:scale-95 sm:flex">
            <Search size={20} className="text-slate-600" />
          </button>

          <button className="hidden h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-all hover:bg-slate-50 active:scale-95 sm:flex">
            <Bookmark size={20} className="text-slate-600" />
          </button>

          <button className="bg-secondary hover:bg-secondary/80 hidden rounded-sm px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-100 transition-all active:scale-95 md:block">
            Sign in
          </button>

          {/* Shadcn Sheet (Drawer) for Mobile */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 text-slate-600 transition-all active:scale-90">
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-75 border-l-slate-100">
                <SheetHeader className="mb-10 text-left">
                  <SheetTitle className="text-primary text-2xl font-bold">Navigation</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`text-lg font-medium transition-colors ${
                        pathname === link.href ? 'text-primary font-bold' : 'text-slate-600'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <hr className="my-2 opacity-50" />
                  <div className="flex flex-col gap-4">
                    <button className="flex items-center gap-3 text-slate-600">
                      <Search size={20} /> Search
                    </button>
                    <button className="flex items-center gap-3 text-slate-600">
                      <Bookmark size={20} /> Bookmark
                    </button>
                    <button className="bg-secondary mt-4 w-full cursor-pointer rounded-sm py-3 font-bold text-white">
                      Sign in
                    </button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNavigationBar;
