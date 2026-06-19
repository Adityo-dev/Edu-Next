'use client';

import { Suspense } from 'react';
import VerifyOtpForm from './_components/VerifyOtpForm/VerifyOtpForm';

const VerifyOtpPage = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white px-6 py-12">
      {/* Background dot grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(#34796f 1.5px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Decorative Blur Orbs */}
      <div className="bg-primary/5 absolute top-1/4 left-1/4 h-72 w-72 rounded-full blur-3xl" />
      <div className="absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-emerald-500/5 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <Suspense fallback={null}>
          <VerifyOtpForm />
        </Suspense>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
