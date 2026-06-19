/* eslint-disable no-unused-vars */
'use client';

import Link from 'next/link';
import RegisterForm from '../RegisterForm/RegisterForm';
import { RegisterFormValues } from '../registerSchema';

interface RegisterRightPanelProps {
  onSubmitForm: (data: RegisterFormValues) => Promise<void>;
  onRoleChange: (_role: 'student' | 'instructor') => void;
  isLoading: boolean;
  apiError: string | null;
  apiSuccess: string | null;
}

const RegisterRightPanel = ({
  onSubmitForm,
  onRoleChange,
  isLoading,
  apiError,
  apiSuccess,
}: RegisterRightPanelProps) => {
  return (
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

        {/* Google */}
        <button
          type="button"
          disabled={isLoading}
          className="mb-5 flex w-full items-center justify-center gap-3 rounded-sm border border-slate-200 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 active:scale-95 disabled:opacity-50"
        >
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

        {/* Success Alert */}
        {apiSuccess && (
          <div className="mb-4 rounded-sm border border-emerald-200 bg-emerald-50 p-3 text-xs font-medium text-emerald-600">
            ✅ {apiSuccess}
          </div>
        )}

        {/* Form */}
        <RegisterForm
          onSubmitForm={onSubmitForm}
          onRoleChange={onRoleChange}
          isLoading={isLoading}
          apiError={apiError}
        />
      </div>
    </div>
  );
};

export default RegisterRightPanel;
