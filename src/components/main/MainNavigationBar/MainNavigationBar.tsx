'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'; // Shadcn Sheet imports
import { Bookmark, Menu, Search, LogOut, LayoutDashboard, LogIn, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import NavbarAuthSection from './_components/NavbarAuthSection/NavbarAuthSection';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout, useCurrentUser, useIsAuthenticated } from '@/redux/features/auth/authSlice';
import { logoutUser } from '@/services/auth/auth.service';
import { ROLE_DASHBOARD_PATH } from '@/constants/dashboardRoutes';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useState } from 'react';
import { apiClient } from '@/redux/apiClient/apiClient';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Courses', href: '/courses' },
  { name: 'Blog', href: '/blog' },
];

const MainNavigationBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(useCurrentUser);
  const isAuthenticated = useAppSelector(useIsAuthenticated);
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
    dispatch(logout());
    dispatch(apiClient.util.resetApiState());
    setOpen(false);
    router.push('/login');
  };

  const dashboardPath = user ? (ROLE_DASHBOARD_PATH[user.role] ?? '/') : '/';

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

          <Link
            href="/wishlist"
            className="hidden h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-all hover:bg-slate-50 active:scale-95 sm:flex"
          >
            <Bookmark size={20} className="text-slate-600" />
          </Link>

          <NavbarAuthSection />

          {/* Shadcn Sheet (Drawer) for Mobile */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 text-slate-600 transition-all active:scale-90">
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="flex w-[85vw] flex-col border-l-slate-100 p-0 sm:w-[350px]"
              >
                <div className="p-6 pb-2">
                  <SheetHeader className="mb-6 text-left">
                    <SheetTitle className="text-primary flex items-center gap-2 text-2xl font-black tracking-tight">
                      <span className="text-primary">Edu</span>
                      <span className="text-secondary"> Next</span>
                    </SheetTitle>
                  </SheetHeader>

                  {/* User Profile Quick Action / Authentication */}
                  {isAuthenticated && user ? (
                    <div className="mb-6 flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
                      <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                        <AvatarFallback className="bg-primary text-lg font-bold text-white">
                          {user?.fullName?.charAt(0).toUpperCase() ?? 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="line-clamp-1 font-bold text-slate-800">
                          {user?.fullName}
                        </span>
                        <span className="text-xs text-slate-500">{user?.email}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-6 flex flex-col gap-3">
                      <p className="mb-1 text-sm font-medium text-slate-500">Get started with us</p>
                      <div className="grid grid-cols-2 gap-3">
                        <Link
                          href="/login"
                          onClick={() => setOpen(false)}
                          className="bg-secondary hover:bg-secondary/90 flex items-center justify-center gap-2 rounded-lg py-2.5 font-semibold text-white shadow-sm transition-all active:scale-95"
                        >
                          <LogIn size={18} />
                          Login
                        </Link>
                        <Link
                          href="/register"
                          onClick={() => setOpen(false)}
                          className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-2.5 font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-95"
                        >
                          <UserPlus size={18} />
                          Register
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto p-6 pt-2">
                  <div className="flex flex-col gap-2">
                    <p className="mb-2 text-xs font-bold tracking-wider text-slate-400 uppercase">
                      Navigation
                    </p>
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center rounded-lg px-4 py-3 text-base font-medium transition-all ${
                          pathname === link.href
                            ? 'bg-primary/5 text-primary font-bold'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>

                  <hr className="my-6 border-slate-100" />

                  <div className="flex flex-col gap-2">
                    <p className="mb-2 text-xs font-bold tracking-wider text-slate-400 uppercase">
                      Quick Links
                    </p>
                    <button className="flex items-center gap-3 rounded-lg px-4 py-3 text-left font-medium text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900">
                      <Search size={20} className="text-slate-400" /> Search
                    </button>
                    <Link
                      href="/wishlist"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-4 py-3 text-left font-medium text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900"
                    >
                      <Bookmark size={20} className="text-slate-400" /> Bookmark
                    </Link>
                  </div>
                </div>

                {/* Footer Section of Drawer */}
                {isAuthenticated && user && (
                  <div className="border-t border-slate-100 bg-white p-6">
                    <div className="flex flex-col gap-2">
                      <Link
                        href={dashboardPath}
                        onClick={() => setOpen(false)}
                        className="bg-primary/10 text-primary hover:bg-primary/20 flex w-full items-center gap-3 rounded-lg px-4 py-3 font-bold transition-all"
                      >
                        <LayoutDashboard size={20} />
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="text-danger flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-bold transition-all hover:bg-red-50"
                      >
                        <LogOut size={20} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNavigationBar;
