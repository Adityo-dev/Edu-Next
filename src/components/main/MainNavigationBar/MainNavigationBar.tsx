'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'; // Shadcn Sheet imports
import { Bookmark, Menu, Search, User, LogOut, LayoutDashboard, LogIn, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import NavbarAuthSection from './_components/NavbarAuthSection/NavbarAuthSection';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout, useCurrentUser, useIsAuthenticated } from '@/redux/features/auth/authSlice';
import { logoutUser } from '@/services/auth/auth.service';
import { ROLE_DASHBOARD_PATH } from '@/constants/dashboardRoutes';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useState } from 'react';

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

          <button className="hidden h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-all hover:bg-slate-50 active:scale-95 sm:flex">
            <Bookmark size={20} className="text-slate-600" />
          </button>

          <NavbarAuthSection />

          {/* Shadcn Sheet (Drawer) for Mobile */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 text-slate-600 transition-all active:scale-90">
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] sm:w-[350px] border-l-slate-100 p-0 flex flex-col">
                <div className="p-6 pb-2">
                  <SheetHeader className="text-left mb-6">
                    <SheetTitle className="text-primary text-2xl font-black tracking-tight flex items-center gap-2">
                      <span className="text-primary">Edu</span>
                      <span className="text-secondary"> Next</span>
                    </SheetTitle>
                  </SheetHeader>
                  
                  {/* User Profile Quick Action / Authentication */}
                  {isAuthenticated && user ? (
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-4 mb-6">
                      <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                        <AvatarFallback className="bg-primary text-lg font-bold text-white">
                          {user?.fullName?.charAt(0).toUpperCase() ?? 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800 line-clamp-1">{user?.fullName}</span>
                        <span className="text-xs text-slate-500">{user?.email}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 mb-6">
                      <p className="text-sm font-medium text-slate-500 mb-1">Get started with us</p>
                      <div className="grid grid-cols-2 gap-3">
                        <Link 
                          href="/login" 
                          onClick={() => setOpen(false)}
                          className="flex items-center justify-center gap-2 bg-secondary text-white py-2.5 rounded-lg font-semibold shadow-sm hover:bg-secondary/90 transition-all active:scale-95"
                        >
                          <LogIn size={18} />
                          Login
                        </Link>
                        <Link 
                          href="/register" 
                          onClick={() => setOpen(false)}
                          className="flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 py-2.5 rounded-lg font-semibold shadow-sm hover:bg-slate-50 transition-all active:scale-95"
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
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Navigation</p>
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center text-base font-medium transition-all px-4 py-3 rounded-lg ${
                          pathname === link.href ? 'bg-primary/5 text-primary font-bold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>

                  <hr className="my-6 border-slate-100" />
                  
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Quick Links</p>
                    <button className="flex items-center gap-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 px-4 py-3 rounded-lg font-medium transition-all text-left">
                      <Search size={20} className="text-slate-400" /> Search
                    </button>
                    <button className="flex items-center gap-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 px-4 py-3 rounded-lg font-medium transition-all text-left">
                      <Bookmark size={20} className="text-slate-400" /> Bookmark
                    </button>
                  </div>
                </div>

                {/* Footer Section of Drawer */}
                {isAuthenticated && user && (
                  <div className="p-6 border-t border-slate-100 bg-white">
                    <div className="flex flex-col gap-2">
                      <Link
                        href={dashboardPath}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 w-full bg-primary/10 text-primary hover:bg-primary/20 px-4 py-3 rounded-lg font-bold transition-all"
                      >
                        <LayoutDashboard size={20} />
                        Dashboard
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full text-danger hover:bg-red-50 px-4 py-3 rounded-lg font-bold transition-all text-left"
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
