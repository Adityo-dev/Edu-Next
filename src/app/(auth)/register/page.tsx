/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ROLE_DASHBOARD_HOME } from '@/components/dashboard/sidebar/sidebarRoutes';
import { setAuth } from '@/redux/features/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { setUserProfile } from '@/services/auth/auth.service';
import { baseApi } from '@/services/root/baseApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import RegisterLeftPanel from './_components/RegisterLeftPanel/RegisterLeftPanel';
import RegisterRightPanel from './_components/RegisterRightPanel/RegisterRightPanel';
import { RegisterFormValues } from './_components/registerSchema';

const RegisterPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [role, setRole] = useState<'student' | 'instructor'>('student');

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);

  const handleRegister = async (data: RegisterFormValues) => {
    setApiError(null);
    setApiSuccess(null);

    const payload = {
      firstName: data?.firstName.trim(),
      lastName: data?.lastName?.trim() || '.',
      email: data?.email.trim(),
      phone: data?.phone.trim(),
      password: data?.password,
      role: data?.role,
      ...(data?.role === 'instructor' && {
        areaOfExpertise: [data?.expertise],
      }),
    };

    try {
      setIsLoading(true);

      const response = await baseApi('/auth/signup', {
        method: 'POST',
        data: payload,
      });

      if (response && (response.success || response.statusCode === 201)) {
        const { token, user } = response;

        if (token && user) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password: _password, ...safeUser } = user;
          await setUserProfile(safeUser, token);
          dispatch(setAuth({ user: safeUser }));

          setApiSuccess('Registration successful! Redirecting...');

          const dashboardPath =
            ROLE_DASHBOARD_HOME[safeUser.role as keyof typeof ROLE_DASHBOARD_HOME] ?? '/';

          setTimeout(() => router.push(dashboardPath), 500);
        } else {
          setApiSuccess('Registration successful! Redirecting to login...');
          setTimeout(() => router.push('/login'), 500);
        }
      } else {
        setApiError(response?.message || 'Registration failed. Please try again.');
      }
    } catch (error: any) {
      setApiError(error.message || 'An unexpected network error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <RegisterLeftPanel role={role} />
      <RegisterRightPanel
        onSubmitForm={handleRegister}
        onRoleChange={setRole}
        isLoading={isLoading}
        apiError={apiError}
        apiSuccess={apiSuccess}
      />
    </div>
  );
};

export default RegisterPage;
