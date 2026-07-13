'use client';

import { useModal } from '@/context/ModalContext';
import { LogIn } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';

const LoginRequiredModal = () => {
  const { closeModal } = useModal();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogin = () => {
    closeModal();
    // Redirect to login and maybe pass current path to return back after login
    router.push(`/login?redirect=${pathname}`);
  };

  return (
    <div className="flex flex-col items-center py-4 text-center">
      <div className="relative mb-5">
        <div className="bg-primary/10 absolute inset-0 animate-pulse rounded-full" />
        <div className="border-primary/20 bg-primary/10 text-primary relative flex h-16 w-16 items-center justify-center rounded-full border">
          <div className="bg-primary/5 flex h-11 w-11 items-center justify-center rounded-full">
            <LogIn size={22} />
          </div>
        </div>
      </div>

      <h3 className="mb-2 text-lg font-semibold tracking-tight antialiased">Login Required</h3>

      <div className="mb-6 w-full px-2">
        <p className="text-text-secondary mb-4 text-sm leading-relaxed font-medium">
          You need to be logged in to access this feature. Please login to continue.
        </p>
      </div>

      <div className="flex w-full gap-3 px-1">
        <DynamicActionButton
          variant="outline"
          label="Cancel"
          onClick={closeModal}
          className="flex-1"
        />

        <DynamicActionButton label="Go to Login" onClick={handleLogin} className="flex-1" />
      </div>
    </div>
  );
};

export default LoginRequiredModal;
