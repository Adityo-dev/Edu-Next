'use client';

import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ROLE_DASHBOARD_PATH } from '@/constants/dashboardRoutes';
import { apiClient } from '@/redux/apiClient/apiClient';
import { logout, useCurrentUser, useIsAuthenticated } from '@/redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logoutUser } from '@/services/auth/auth.service';
import { Bookmark, LayoutDashboard, LogIn, LogOut, Menu, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import NavbarAuthSection from './_components/NavbarAuthSection/NavbarAuthSection';

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
        <Link href={'/'} className="group flex cursor-pointer items-center gap-3">
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
        </Link>

        {/* Middle Section: Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
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
        <div className="flex items-center gap-3.5">
          <Link
            href="/wishlist"
            className="bg-primary/10 hidden h-10 w-10 items-center justify-center rounded-full transition-all hover:bg-slate-50 active:scale-95 lg:flex"
          >
            <Bookmark size={20} className="text-primary" />
          </Link>

          <NavbarAuthSection />

          {/* Shadcn Sheet (Drawer) for Mobile */}
          <div className="lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button className="bg-primary/4 text-primary flex h-10 w-10 items-center justify-center rounded-md transition-all active:scale-90">
                  <Menu size={22} />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="flex w-[85vw] flex-col border-l-slate-100 p-0 sm:w-87.5"
              >
                <div className="pb-2">
                  <SheetHeader className="mb-6 text-left">
                    <SheetTitle className="text-primary flex items-center gap-2 text-2xl font-black tracking-tight">
                      <span className="text-primary">Edu</span>
                      <span className="text-secondary"> Next</span>
                    </SheetTitle>
                  </SheetHeader>

                  {/* User Profile Quick Action / Authentication */}
                  {isAuthenticated && user ? (
                    <div className="border-border/50 bg-primary/7 flex items-center gap-3 rounded-sm border p-2.5">
                      <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                        <AvatarFallback className="bg-primary font-semibold text-white">
                          {user?.fullName?.charAt(0).toUpperCase() ?? 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="line-clamp-1 text-sm font-semibold">{user?.fullName}</span>
                        <span className="text-text-secondary text-xs">{user?.email}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-3 flex flex-col gap-3 px-4">
                      <p className="text-text-secondary mb-1 text-sm">Get started with us</p>
                      <div className="grid grid-cols-2 gap-3">
                        <DynamicActionButton
                          label="Login"
                          showIcon
                          icon={LogIn}
                          href="/login"
                          onClick={() => setOpen(false)}
                          className="w-full"
                        />
                        <DynamicActionButton
                          label="Register"
                          showIcon
                          icon={UserPlus}
                          href="/register"
                          onClick={() => setOpen(false)}
                          className="w-full"
                          variant="secondary"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto px-4">
                  <div className="flex flex-col gap-2">
                    <p className="text-text-secondary text-xs font-semibold tracking-wider uppercase">
                      Navigation
                    </p>
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center rounded-sm px-4 py-2.5 text-sm font-medium transition-all ${
                          pathname === link.href
                            ? 'bg-primary/5 text-primary font-semibold'
                            : 'hover:text-primary-dark text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>

                  <hr className="border-border/50 my-4" />

                  <div className="flex flex-col gap-2">
                    <p className="text-text-secondary mb-2 text-xs font-semibold tracking-wider uppercase">
                      Quick Links
                    </p>
                    <Link
                      href="/wishlist"
                      onClick={() => setOpen(false)}
                      className="hover:text-primary-dark flex items-center gap-3 rounded-md px-4 py-2.5 text-left text-sm font-medium text-slate-600 transition-all hover:bg-slate-50"
                    >
                      <Bookmark size={20} className="text-slate-400" /> Bookmark
                    </Link>
                  </div>
                </div>

                {/* Footer Section of Drawer */}
                {isAuthenticated && user && (
                  <div className="border-border/50 border-t bg-white p-4">
                    <div className="flex flex-col gap-2">
                      <Link
                        href={dashboardPath}
                        onClick={() => setOpen(false)}
                        className="bg-primary/10 text-primary hover:bg-primary/20 flex w-full items-center gap-3 rounded-md px-4 py-2.5 font-semibold transition-all"
                      >
                        <LayoutDashboard size={20} />
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="text-danger flex w-full items-center gap-3 rounded-md px-4 py-2.5 text-left font-semibold transition-all hover:bg-red-50"
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
