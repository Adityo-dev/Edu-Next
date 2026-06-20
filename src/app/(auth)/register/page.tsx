/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { baseApi } from '@/services/root/baseApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import RegisterLeftPanel from './_components/RegisterLeftPanel/RegisterLeftPanel';
import RegisterRightPanel from './_components/RegisterRightPanel/RegisterRightPanel';
import { RegisterFormValues } from './_components/registerSchema';

const RegisterPage = () => {
  const router = useRouter();

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
        setApiSuccess('Registration successful! Please verify your email...');

        setTimeout(() => {
          router.push(`/verify-otp?email=${encodeURIComponent(data.email.trim())}`);
        }, 800);
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
