'use client';

import { apiClient } from '@/redux/apiClient/apiClient';
// import { logout } from '@/redux/features/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { logoutUser } from '@/services/auth/auth.service';
import { usePathname, useRouter } from 'next/navigation';

export const protectedRoutes = ['/dashboard'];
export const useLogout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    // dispatch(logout());

    dispatch(apiClient.util.resetApiState());

    await logoutUser();
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push('/');
    }
  };

  return handleLogout;
};
