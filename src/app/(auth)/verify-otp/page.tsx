'use client';

import { Suspense } from 'react';
import VerifyOtpForm from './_components/VerifyOtpForm/VerifyOtpForm';

const VerifyOtpPage = () => {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white px-4 py-12 sm:px-6">
      {/* Background dot grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(#34796f 1.5px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Decorative Glow Orbs */}
      <div className="bg-primary/5 pointer-events-none absolute top-1/4 left-1/4 z-0 h-72 w-72 rounded-full blur-3xl" />
      <div className="bg-primary/10 pointer-events-none absolute right-1/4 bottom-1/4 z-0 h-72 w-72 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-110">
        <Suspense fallback={null}>
          <VerifyOtpForm />
        </Suspense>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
